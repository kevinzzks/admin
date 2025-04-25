<template>
  <div class="client-scopes">
    <a-table 
     :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns" :pagination="false" :data-source="sourceData" :scroll="{ y: 440 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <a @click="goDetails(record)">{{ text }}</a>
        </template>

        <template v-else-if="column.dataIndex === 'type'">
          <a-select
            :value="text"
            style="width: 120px"
            @change="handleChange($event, record)"
          >
          <a-select-option value="None">None</a-select-option>
            <a-select-option value="Default">Default</a-select-option>
            <a-select-option value="Optional">Optional</a-select-option>
    </a-select>
        </template>

        <template v-else-if="column.dataIndex === 'operation'">
          <a-popover placement="bottomRight" trigger="click">
            <template #content>
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
              placeholder="Search for client scope"
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
      <!-- <template #footer>Footer</template> -->
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
  ArrowRightOutlined, SyncOutlined, MoreOutlined,
} from '@ant-design/icons-vue';
export default {
  name: 'realmRoles',
  components: {
    ArrowRightOutlined, SyncOutlined, MoreOutlined,
  },
  data() {
    return {
      selectedRowKeys: [], // 选中的行的key
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 120,
        },
        {
          title: 'Assigned type',
          dataIndex: 'type',
          width: 120,
        },
        {
          title: 'Protocol',
          dataIndex: 'protocol',
          width: 120,
        },
        {
          title: 'Display order',
          dataIndex: 'order',
          width: 100,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          width: 250,
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
      optionalData: [],
      defaultData: [],
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
    this.getClientScopes({ first: 0, max: 11 }, 'reset', true); // 获取数据
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
    async getClientScopes() {
      await this.$store.dispatch('login/getToken', {})
      api.getClientScopes().then(async (res) => {
        if (res.status === 200) {
          if (res.data) {
            let newData = res.data.map(item => {
              return {
                ...item,
                key: item.id, // 设置唯一标识
                description: item.description ? item.description : '——', // 处理description
                order: item.attributes['gui.order'] ? item.attributes['gui.order'] : '——', // 处理order
              };
            });

            let res1 = await api.getDefaultClientScopes();
            let res2 = await api.getOptionalClientScopes();
            this.defaultData = res1.data;
            this.optionalData = res2.data;
            newData.sort((a, b) => a.name.localeCompare(b.name));
            // console.log('defaultData', this.defaultData)
            // console.log('optionalData', this.optionalData)
            newData = newData.map(item => {
              if (this.defaultData.some(defaultItem => defaultItem.id === item.id)) {
                return { ...item, type: 'Default' };
              } else if (this.optionalData.some(optionalItem => optionalItem.id === item.id)) {
                return { ...item, type: 'Optional' };
              } else {
                return { ...item, type: 'None' };
              }
            });
            this.data = newData;
            this.$message.success('访问成功！')
          }
        }
      }).catch(err => {
        this.$router.push('/login')
        this.$message.error(err)
      })


    },
    // 处理删除操作
    onDelete(id) {
      api.deleteRealmRoles({ id }).then(res => {
        if (res.status === 204) {
          this.$message.success('删除成功！');
          this.open = false; // 关闭加载状态
          let data = { first: (this.pagination.current - 1) * this.pagination.pageSize, max: this.pagination.pageSize + 1 };
          this.data = this.data.filter(item => item.key !== id); // 更新本地数据
          this.getClientScopes(data, 'add', true); // 刷新数据
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 处理搜索操作
    onSearch(searchValue) {
      console.log('搜索功能尚未实现', searchValue)
      this.pagination.current = 1;

    },
    // 处理Refresh
    onRefresh() {
      this.searchValue = ''
      this.pagination = {
        pageSize: 10,
        current: 1,
      }
      this.getClientScopes(); // 获取数据
    },
    // 处理创建操作
    onCreateRule() {
      this.$router.push('/home/client-scopes/new')
    },
    // 处理分页操作
    onPagination(current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      // let data = { first: (this.pagination.current - 1) * this.pagination.pageSize, max: this.pagination.pageSize + 1 };
      // this.getClientScopes(data, 'add', true); // 获取数据
    },
    // 处理跳转到详情页操作
    goDetails(record) {
      this.$router.push({ path: '/home/client-scopes/details', query: { id: record.id } })
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
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
    async handleChange(value, record) {
      if (value === 'None') {
        await api.updateAssignedType({ type: record.type.toLowerCase(), id: record.id, method: 'DELETE' })
      } else if (value === 'Default') {
        await api.updateAssignedType({ type:record.type.toLowerCase(), id: record.id, method: 'DELETE' })
        await api.updateAssignedType({ type: value.toLowerCase(), id: record.id, method: 'PUT' })
      } else if (value === 'Optional') {
        await api.updateAssignedType({ type: record.type.toLowerCase(), id: record.id, method: 'DELETE' })
        await api.updateAssignedType({ type: value.toLowerCase(), id: record.id, method: 'PUT' })
      }
      this.getClientScopes(); // 刷新数据
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
