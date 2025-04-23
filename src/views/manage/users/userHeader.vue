<!-- Dom模板 -->
<template>
  <div>
    <div class="custom-page-header" v-if="$route.name == 'Users'">
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
    <div class="custom-page-header" v-else>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(route, index) in routes" :key="index">
          <template v-if="route.path">
            <a @click="navigateTo(route.path)">{{ route.breadcrumbName }}</a>
          </template>
          <template v-else>
            <span>{{ route.breadcrumbName }}</span>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <h2 class="page-title" v-if="$route.name==='CreateRealmRole'">Create role</h2>
      <h2 class="page-title page-title-conter" v-else>
        <div class="page-title-left">
          {{ $store.state.home.roleDetails.name }}
          <a-tag v-if="$store.state.home.roleDetails.composite" color="default">Composite</a-tag>
        </div>
        <div class="page-title-right">
          <a-dropdown placement="bottom" :arrow="{ pointAtCenter: true }">
            <a-button>
              Action
              <DownOutlined />
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="open=true">Delete this role</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </h2>
    </div>
    <a-menu
      v-if="$route.name!=='CreateRealmRole' && $route.name !== 'Users'"
      @click="goChildren"
      class="horizontal-header"
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
    />
    <a-modal centered v-model:open="open" title="Delete role?">
      <p>This action will permanently delete the role "admin" and cannot be undone.</p>
      <template #footer>
        <a-button key="back" type="text" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" danger type="primary" :loading="loading" @click="handleOk">Delete</a-button>
      </template>
    </a-modal>
    
  </div>
</template>
    
    <script>
import api from '@/api/index';
    import { DownOutlined, ExportOutlined } from '@ant-design/icons-vue';

export default {
  name: 'LoGin',
  components: { DownOutlined,ExportOutlined },
  // inheritAttrs: false,
  // props: ['mess'],
  data() {
    return {
      routes: [
        {
          path: '/home/roles',
          breadcrumbName: this.$t("titleRoles"),
        },
        {
          path: '',
          breadcrumbName: 'Create role',
        },

      ],
      current: ['DetailsRealmRole'],
      items: [],
      open: false,
      loading: false,
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    if (this.$route.name !== 'CreateRealmRole') {
      let itemList = this.$router.options.routes[1].children.find(route => route.name === 'Roles')?.children || [];
      itemList.forEach(item => {
        const menuItem = {
          key: item.name,
          label: item.meta.title,
        };
        if (item.meta.keepAlive) this.items.push(menuItem);
      });
      this.getRealmRole(); // 获取角色详情
    }



  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {},
  // Vue方法定义
  methods: {
    goChildren(e) {
      this.$router.push({ name: e.key, query: { id: this.$route.query.id } });
    },
    navigateTo(path) {
      if (path) {
        this.$router.push(path);
      }
    },

    async getRealmRole() {
      const id = this.$route.query.id; // 从路由参数中获取 id
      if (id) {
        // 调用获取角色详情的方法
        await this.$store.dispatch('login/getToken', {});
        api.getRealmRole({ id: id }, 'id').then((res) => {
          if (res.status === 200) {
            this.$store.commit('home/setRoleDetails', res.data); // 将角色详情存储到 Vuex 中
            this.$message.success('Role details fetched successfully!');
          } else {
            this.$message.error('Failed to fetch role details');
          }
        }).catch(() => {
          this.$message.error('Error fetching role details');
        });
      } else {
        this.$message.error('No role ID found in route parameters');
      }
    },

    onDelete() {
      const id = this.$route.query.id; // 从路由参数中获取 id
      api.deleteRealmRoles({ id }).then(res => {
        if (res.status === 204 || res.status === 200) {
          this.$message.success('删除成功！')
          this.loading = false;// 关闭加载状态
          this.open = false;// 关闭模态框
          this.$router.push('/home/roles'); // 删除成功后跳转到角色列表页面

        } else {
          this.$message.error('删除失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },

    handleCancel() {
      this.open = false;
    },
    handleOk() {
      this.loading = true;
      this.onDelete()

    },
  }
}
    </script>
    
    <style scoped>
/*@import url(''); 引入css类*/
.horizontal-header {
  padding: 0;
  margin-bottom: 40px;
}
.page-title-conter {
  display: flex;
  justify-content: space-between;
}
</style>
  
  