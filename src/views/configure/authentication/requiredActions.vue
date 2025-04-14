<!-- Dom模板 -->
<template>
  <div>
    <a-table :columns="columns" :pagination="false" :data-source="data" :scroll="{ y: 640 }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <a-space :size="small">
            <UnorderedListOutlined />
            <span>{{ text }}</span>
          </a-space>
        </template>

        <template v-if="column.dataIndex === 'enabled'">
          <a-switch :checked="text" @change="changeTheme" checked-children="ON" un-checked-children="OFF" >
            
          </a-switch>
        </template>
        <template v-if="column.dataIndex === 'defaultAction'" >
          <a-switch :checked="text" :disabled="!record.enabled" @change="changeTheme" checked-children="ON" un-checked-children="OFF" />
        </template>
        <template v-else-if="column.dataIndex === 'configurable'">
          <a-popover placement="bottomRight" trigger="click">
            <template #content>
              <a @click="onOpen(record.key)">Delete</a>
            </template>
            <MoreOutlined />
          </a-popover>
        </template>
      </template>
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
  MoreOutlined, UnorderedListOutlined
} from '@ant-design/icons-vue'
export default {
  name: 'LoGin',
  components: {
    MoreOutlined, UnorderedListOutlined
  },
  data() {
    return {
      columns: [
        {
          title: 'Action',
          dataIndex: 'name',
          width: 350,
        },
        {
          title: 'Enabled',
          dataIndex: 'enabled',
          width: 200,
        },
        {
          title: 'Set as default action',
          dataIndex: 'defaultAction',
          width: 200,
        },
        {
          title: 'Configure',
          dataIndex: 'configurable',
          width: 150,
          fixed: 'right',
          align: 'center',
        },

      ],
      data: [],

      open: false, // 删除弹窗的状态
      delId: '', // 删除的角色ID
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getRequiredActions(); // 获取数据
  },

  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {

  },
  // Vue方法定义
  methods: {
    async getRequiredActions() {
      await this.$store.dispatch('login/getToken', {})
      api.getRequiredActions().then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.data = res.data.map(item => {
              return {
                ...item,
                key: item.id, // 设置唯一标识

              };
            })
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


  }
}
    </script>
    
    <style scoped></style>
  
  