<template>
  <a-layout class="site-layout">
    <a-layout-header class="header" style="background: #fff; padding: 0">
      <div class="header-left">
        <div class="collapsed">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
        <div class="logo">
          <img src="@/assets/img/header_logo.png" alt="Header Logo" />
        </div>
      </div>
      <div class="header-right">
        <div class="switch">
          <a-switch :checked="state.theme === 'dark'" @change="changeTheme" />
          <span class="ant-divider" style="margin: 0 1em" />
          Change Theme
        </div>
        <div class="user-info">
          <a-dropdown placement="bottom" :arrow="{ pointAtCenter: true }">
            <a-button>admin</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">Manage account</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Realm info</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Clear Caches</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a href="javascript:;" @click="onSignout">Sign out</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>&nbsp;
          <a-avatar :size="32">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content class="content-wrapper" style="padding: 0 50px">
      <a-breadcrumb class="breadcrumb" style="margin: 16px 0"></a-breadcrumb>
      <a-layout class="content-fill" style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" v-model:collapsed="collapsed" :trigger="null" collapsible>
          <a-menu
            :theme="state.theme"
            :selectedKeys="[defaultKey]"
            v-model:openKeys="state.openKeys"
            style="height: 100%"
            @click="onClickMenuItem"
          >
            <template v-for="item in menuList" :key="item.key">
              <a-menu-item>
                <component :is="item.icon" />
                <span>{{ item.label }}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '680px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">Copyright ©{{ new Date().getFullYear() }} Lenovo</a-layout-footer>
  </a-layout>
</template>
<script>
// import { ref } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined, UserOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import api from '@/api/index.js';
export default {
  name: 'HOME',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined, UserOutlined
  },
  data() {
    return {
      collapsed: false,
      state: {
        theme: 'dark',
        selectedKeys: ['1'],
        openKeys: ['home/roles'],
      },
      // 侧边栏数据
      menuList: []
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    window.global = this;
    this.menuList = this.$router.options.routes[1].children.map(item => {
      return {
        key: item.meta.pathname,
        title: item.meta.title,
        icon: item.meta.icon,
        label: item.meta.title,
        children: item.children ? item.children.map(child => {
          return {
            key: child.meta.pathname,
            title: child.meta.title,
            icon: child.meta.icon,
            label: child.meta.title,
            children: child.children ? child.children.map(subChild => {
              return {
                key: subChild.meta.pathname,
                title: subChild.meta.title,
                icon: subChild.meta.icon,
                label: subChild.meta.title,
              }
            }) : null

          }
        }) : null
      }
    });
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {
    defaultKey() {
      let pathKey = this.$route.path;
      if (pathKey.indexOf('roles/new') !== -1) {
        return '/home/roles';
      }
      return pathKey;
    },
  },
  // Vue方法定义
  methods: {
    changeTheme(checked) {
      this.state.theme = checked ? 'dark' : 'light';
    },
    onClickMenuItem(item) {
      // 处理菜单项点击事件
      this.$router.push(item.key);
      message.info(`You selected ${item.key}`);
    },
    onSignout() {
      const token = this.$Cookies.get('refresh_token')
      if (!token) {
        this.$router.push('/login');
        return;
      }
      api.logout(token).then(res => {
        if (res.status === 200 || res.status === 204) {
          message.success('Sign out successfully!');
          this.$router.push('/login');
        } else {
          message.error('Sign out failed!');
        }
      }).catch(error => {
        console.error('Error during sign out', error);
        message.error('Sign out failed!');
      });
    },
  }
}

</script>
<style lang="scss" scoped>
.ant-layout.site-layout {
  height: 100vh !important;
  display: flex;
  flex-direction: column;
}
.ant-layout-content {
  display: flex;
  flex-direction: column;
  .fixed-header {
    height: 100px; // 固定高度
    flex-shrink: 0;
  }
  .flex-content {
    flex: 1; // 填满剩余空间
    overflow: auto;
  }
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  .logo {
    width: auto;
    height: 100%;
    margin: auto 0px;
    display: inline-block;
    img {
      width: 140px;
    }
  }
  .collapsed {
    display: flex;
    margin: auto 50px;
    .anticon-menu-fold,
    .anticon-menu-unfold {
      font-size: 24px;
    }
  }
  .header-left {
    display: flex;
  }
  .header-right {
    display: flex;
    margin-right: 5%;
  }
  .switch {
    display: inline-block;
    margin: auto 50px;
  }
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%; // 确保父容器高度为 100%
}

.breadcrumb {
  flex: 0 0 auto; // 固定高度
}

.content-fill {
  flex: 1 1 auto; // 填满剩余空间
  overflow: auto; // 如果内容超出，允许滚动
}
.site-layout-background {
  background: #fff;
}
</style>