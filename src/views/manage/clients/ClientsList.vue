<!-- Dom模板 -->
<template>
  <div>
    <a-table :columns="columns" :pagination="false" :data-source="sourceData" :scroll="{ y: 440 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'clientId'">
          <a @click="goDetails(record)">{{ text }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'name'">{{ text.replace(/^\$\{(.*)\}$/, '$1') }}</template>
        <template v-else-if="column.dataIndex === 'protocol'">{{ text ? text : 'OpenID Connect' }}</template>
        <template v-else-if="column.dataIndex === 'description'">{{ text ? text : '——' }}</template>
        <template v-else-if="column.dataIndex === 'baseUrl'">
          <span v-if="!text">——</span>
          <a v-else-if="text.length>10" :href="text">
            {{ text ? $reqUrl + text : '' }}
            <ExportOutlined />
          </a>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popover placement="bottomRight" trigger="click">
            <template #content>
              <a-space>
                <a @click="onExport(record)">{{ $t('export') }}</a>
              </a-space>
              <br>
              <a @click="onOpen(record.key)">{{$t('delete')}}</a>
            </template>
            <MoreOutlined />
          </a-popover>
        </template>
      </template>

      <template #title>
        <div class="table-title-left">
          <a-space direction="vertical">
            <a-input-search
              v-model:value="searchValue"
              placeholder="Search role by name"
              size="large"
              @search="onSearch"
              allowClear
            >
              <template #enterButton>
                <a-button>
                  <ArrowRightOutlined />
                </a-button>
              </template>
            </a-input-search>
          </a-space>
          <a-space class="create-button">
            <a-button type="primary" size="large" @click="onCreateRule">Create role</a-button>
          </a-space>
          <a-space>
            <a-button @click="onRefresh" size="large" class="Refresh" type="text">
              <SyncOutlined />Refresh
            </a-button>
          </a-space>
        </div>
      </template>
      <template #footer>
        <a-space>
          <a-pagination
            @change="onPagination"
            v-model:current="pagination.current"
            v-model:page-size="pagination.pageSize"
            showSizeChanger
            :total="data.length"
          />
        </a-space>
      </template>
    </a-table>
    <a-modal centered v-model:open="open" :title="$t('roleDeleteConfirm')">
      <p>This action will permanently delete the role "admin" and cannot be undone.</p>
      <template #footer>
        <a-button key="back" type="text" @click="handleCancel">{{$t('cancel')}}</a-button>
        <a-button key="submit" danger type="primary" @click="handleOk">{{$t('delete')}}</a-button>
      </template>
    </a-modal>
  </div>
</template>
    
<script>
import api from '@/api/index.js';
import {
  ArrowRightOutlined, SyncOutlined, MoreOutlined, ExportOutlined,
} from '@ant-design/icons-vue';
export default {
  name: 'LoGin',
  components: {
    ArrowRightOutlined, SyncOutlined, MoreOutlined, ExportOutlined,
  },
  data() {
    return {
      // Client ID	Name	Type	Description	Home URL
      columns: [
        {
          title: this.$t('clientId'),
          dataIndex: 'clientId',
          width: 150,
        },
        {
          title: this.$t('name'),
          dataIndex: 'name',
          width: 150,
        },
        {
          title: this.$t('type'),
          dataIndex: 'protocol',
          width: 150,
        },
        {
          title: this.$t('description'),
          dataIndex: 'description',
          width: 150,
        },
        {
          title: this.$t('homeURL'),
          dataIndex: 'baseUrl',
          width: 350,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          width: 150,
          fixed: 'right',
          align: 'right',
        },

      ],
      data: [],
      pagination: {
        pageSize: 10,
        current: 1,
      },
      searchValue: '', // 搜索框的值
      open: false, // 删除弹窗的状态
      delId: '', // 删除的角色ID
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getClients({ first: 0, max: 11 }, 'reset', true); // 获取数据

  },

  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {
    sourceData() {
      return this.data.slice((this.pagination.current - 1) * this.pagination.pageSize, this.pagination.current * this.pagination.pageSize);
    },
  },
  // Vue方法定义
  methods: {
    async getClients(data = {}, type = 'add', token = true) {
      if (token) {
        await this.$store.dispatch('login/getToken', {})
      }

      api.getClients(data).then(res => {
        if (res.status === 200) {
          if (res.data) {
            let newData = res.data.map(item => {
              return {
                ...item,
                key: item.id, // 设置唯一标识
                baseUrl: item.baseUrl ? item.baseUrl : '', // 处理baseUrl
              };
            });
            // this.data = newData; // 只显示前 pageSize 条数据
            if (type === 'reset') {
              this.data = newData;
            } else {
              this.data = this.data.map(existingItem => {
                const newItem = newData.find(newItem => newItem.id === existingItem.id);
                return newItem ? newItem : existingItem;
              }).concat(
                newData.filter(newItem => !this.data.some(existingItem => existingItem.id === newItem.id))
              );
            }

            this.$message.success('访问成功！')
          } else {
            this.$message.error('没有数据！')
          }

        } else {
          this.$message.error('访问失败！')
        }
      }).catch(err => {
        // this.$router.push('/login')
        this.$message.error(err)
      })
    },
    // 处理删除操作
    onDelete(id) {
      api.deleteClients({ id }).then(res => {
        if (res.status === 204) {
          this.$message.success('删除成功！');
          this.open = false; // 关闭加载状态
          let data = { first: (this.pagination.current - 1) * this.pagination.pageSize, max: this.pagination.pageSize + 1 };
          this.data = this.data.filter(item => item.key !== id); // 更新本地数据
          this.getClients(data, 'add', true); // 刷新数据
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 处理搜索操作
    onSearch(searchValue) {
      let data = { search: searchValue, first: 0, max: this.pagination.pageSize + 1 }
      this.pagination.current = 1;
      this.getClients(data, 'reset', true); // 获取数据
    },
    // 处理Refresh
    onRefresh() {
      this.searchValue = ''
      this.pagination = {
        pageSize: 10,
        current: 1,
      }
      let data = { first: 0, max: 11 }
      this.getClients(data, 'reset', true); // 获取数据
    },
    // 处理创建操作
    onCreateRule() {
      this.$router.push('/home/roles/new')
    },
    // 处理分页操作
    onPagination(current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      let data = { first: (this.pagination.current - 1) * this.pagination.pageSize, max: this.pagination.pageSize + 1 };
      this.getClients(data, 'add', true); // 获取数据
    },
    // 处理跳转到详情页操作
    goDetails(record) {
      this.$router.push({ path: '/home/roles/details', query: { id: record.id } })
    },

    onOpen(e) {
      this.open = true;
      this.delId = e; // 获取要删除的角色ID
    },
    handleOk() {
      this.onDelete(this.delId)
    },

    handleCancel() {
      this.open = false;
    },

    onExport(record) {
      // console.log(record);
      this.$message.success('导出成功！')
      // 添加导出逻辑
      const jsonData = JSON.stringify(record, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${record.name.replace(/^\$\{(.*)\}$/, '$1') || 'export'}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  }
}
</script>
    
<style scoped>
/*@import url(''); 引入css类*/

</style>

