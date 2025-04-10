<template>
  <div class="users">
    <div class="custom-page-header">
      <h2 class="page-title">Users</h2>
      <p class="page-description">
        Users are the users in the current realm
        <a
          href="https://www.keycloak.org/docs/latest/server_admin/index.html#assembly-managing-users_server_administration_guide"
        >
          Learn more
          <ExportOutlined />
        </a>
      </p>
    </div>

    <a-table :columns="columns" :pagination="false" :data-source="sourceData" :scroll="{ y: 340 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <a @click="goDetails(record)">{{ text }}</a>
          <a-tooltip class="tooltip-defaultRole">
            <template #title>defaultRole</template>
            <QuestionCircleOutlined v-if="text=='default-roles-master'" />
          </a-tooltip>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popover placement="bottomRight" trigger="click">
            <template #content>
              <a @click="onOpen(record.key)">Delete</a>
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
    <a-modal centered v-model:open="open" title="Delete role?">
      <p>This action will permanently delete the role "admin" and cannot be undone.</p>
      <template #footer>
        <a-button key="back" type="text" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" danger type="primary" @click="handleOk">Delete</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api/index.js';
import {
  ExportOutlined, QuestionCircleOutlined, ArrowRightOutlined, SyncOutlined,MoreOutlined,
} from '@ant-design/icons-vue';
export default {
  name: 'realmRoles',
  components: {
    ExportOutlined, QuestionCircleOutlined, ArrowRightOutlined, SyncOutlined,MoreOutlined,
  },
  data() {
    return {
      columns: [
        {
          title: 'Username',
          dataIndex: 'username',
          width: 200,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          width: 200,
        },
        {
          title: 'Last name',
          dataIndex: 'lastName',
          width: 200,
        },
        {
          title: 'First name',
          dataIndex: 'firstName',
          width: 200,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          width: 150,
          fixed: 'right',
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
    this.getUsers({ first: 0, max: 11 }, 'reset', true); // 获取数据
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
    async getUsers(data = {}, type = 'add', token = true) {
      if (token) {
        await this.$store.dispatch('login/getToken', {})
      }

      api.getUsers(data).then(res => {
        if (res.status === 200) {
          if (res.data) {
            let newData = res.data.map(item => {
              return {
                ...item,
                key: item.id, // 设置唯一标识
                username: item.username || "—",
                firstName: item.firstName || "—",
                lastName: item.lastName || "—",
                email: item.email || "—",

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
          this.getUsers(data, 'add', true); // 刷新数据
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
      this.getUsers(data, 'reset', true); // 获取数据
    },
    // 处理Refresh
    onRefresh() {
      this.searchValue = ''
      this.pagination = {
        pageSize: 10,
        current: 1,
      }
      let data = { first: 0, max: 11 }
      this.getUsers(data, 'reset', true); // 获取数据
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
      this.getUsers(data, 'add', true); // 获取数据
    },
    // 处理跳转到详情页操作
    goDetails(record) {
      this.$router.push({ path: '/home/roles/details', query: { id: record.id } })
    },

    onOpen(e) {
      this.open = true;
      this.delId = e; // 获取要删除的角色ID
    },

    handleCancel() {
      this.open = false;
    },
    handleOk() {
      this.onDelete(this.delId)

    },
  }
}
</script>

<style lang="scss" scoped>
.users {
 
  .tooltip-defaultRole {
    margin-left: 10px;
  }

}
</style>
