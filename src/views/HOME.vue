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
    <a-layout-content class="content-wrapper" style="padding: 0 50px;">
      <a-breadcrumb class="breadcrumb" style="margin: 0 0"></a-breadcrumb>
      <a-layout class="content-fill" style="padding: 24px 0;background: #fff">
        <a-layout-sider
          width="200"
          :theme="state.theme"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <a-dropdown :trigger="['click']" placement="bottom" :arrow="{ pointAtCenter: true }">
            <div class="ant-dropdown-realm">
              <div class="realm-name">
                <div>{{realm.displayName}}</div>
                <div class="realm-name-realm">{{realm.name}}</div>
              </div>
              <DownOutlined />
            </div>
            <template #overlay>
              <a-menu class="realmList-spac">
                <a-menu-item  v-for="item in realmList" :key="item.name" @click="onRealm(item)">
                  <a href="javascript:;">{{item.displayName}}</a>
                  <a href="javascript:;">{{item.name}}</a>
                </a-menu-item>
                <a-menu-item @click="goCreateRealm">
                  <a-button type="primary" style="width: 100%">Create realm</a-button>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div class="list-title">Manage</div>
          <a-menu
            :theme="state.theme"
            :selectedKeys="[defaultKey]"
            v-model:openKeys="state.openKeys"
            style="height: 30%"
            @click="onClickMenuItem"
          >
            <template v-for="item in manageList" :key="item.key">
              <a-menu-item>
                <component :is="item.icon" />
                <span>{{ item.label }}</span>
              </a-menu-item>
            </template>
          </a-menu>
          <div class="list-title">Configure</div>

          <a-menu
            :theme="state.theme"
            :selectedKeys="[defaultKey]"
            v-model:openKeys="state.openKeys"
            style="height: 30%"
            @click="onClickMenuItem"
          >
            <template v-for="item in configList" :key="item.key">
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
  MenuFoldOutlined, UserOutlined, DownOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import api from '@/api/index.js';
export default {
  name: 'HOME',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined, UserOutlined, DownOutlined
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
      manageList: [],
      configList: [],
      realmList: [],//` 当前realm列表
      realm: {
        name: 'master',
        displayName: 'Keycloak',
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    window.global = this;
    this.setleftList(); //` 设置侧边栏数据
    this.getRealmList(); // 获取当前realm列表
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {
    defaultKey() {
      let pathKey = this.$route.path;
      if (pathKey.indexOf('home/roles') !== -1) {
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
    onRealm(e) {
      this.realm=e;
      this.$store.commit('login/setRealm', e.name);
    },
    goCreateRealm() {
      this.$router.push('/home/add-realm');
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
    setleftList() {
      this.$router.options.routes[1].children.forEach(item => {
        const menuItem = {
          key: item.meta.pathname,
          title: item.meta.title,
          icon: item.meta.icon,
          label: item.meta.title,
          type: item.meta.type,
        };

        // 根据 type 判断加入哪个列表
        if (item.meta.type === 'Manage') {
          this.manageList.push(menuItem);
        } else {
          this.configList.push(menuItem);
        }
      });
    },
    getRealmList() {
      api.getRealmList().then(res => {
        if (res.status === 200) {
          this.realmList = res.data;
        } else {
          message.error('Failed to fetch realm list!');
        }
      }).catch(error => {
        console.error('Error fetching realm list', error);
        message.error('Failed to fetch realm list!');
      });
    }
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
  .list-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: left;
    color: #fff;
    padding-inline: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-inline: 4px;
    margin-block: 4px;
    width: calc(100% - 8px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
}
.ant-dropdown-realm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  border: 1px solid #fff;
  margin: 24px 16px;
  padding: 8px 16px;
  .realm-name {
    margin-right: 8px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    line-height: 1.5em; // 设置行高
    overflow: hidden; // 隐藏超出部分
    text-overflow: ellipsis; // 显示省略号
    white-space: nowrap; // 不换行
    cursor: pointer;
    .realm-name-realm {
      font-size: 14px;
      color: #fff;
      font-weight: normal;
    }
  }
}
.realmList-spac{
  ::v-deep li{
    border-bottom: 1px solid #f0f0f0;
    height: 50px;
    .ant-dropdown-menu-title-content{
      display: flex;
      flex-direction: column;
      line-height: 1em; // 设置行高
    }
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