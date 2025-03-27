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
      <div class="header-right">个人设置</div>
    </a-layout-header>
    <a-layout-content class="content-wrapper" style="padding: 0 50px">
      <a-breadcrumb class="breadcrumb" style="margin: 16px 0">
        <div class="switch">
          <a-switch :checked="state.mode === 'vertical'" @change="changeMode" />Change Mode
          <span class="ant-divider" style="margin: 0 1em" />
          <a-switch :checked="state.theme === 'dark'" @change="changeTheme" />Change Theme
        </div>
      </a-breadcrumb>
      <a-layout class="content-fill" style="padding: 24px 0; background: #fff">
        <a-layout-sider
          width="200"
          style="background: #fff"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <a-menu
            :mode="state.mode"
            :theme="state.theme"
            v-model:selectedKeys="selectedWeb"
            v-model:openKeys="openKeys"
            style="height: 100%"
          >
            <a-menu-item key="menu1">
              <user-outlined />
              <span>menu 1</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  <span>subnav 1</span>
                </span>
              </template>
              <a-menu-item key="1">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <laptop-outlined />
                  <span>subnav 2</span>
                </span>
              </template>
              <a-menu-item key="5">option5</a-menu-item>
              <a-menu-item key="6">option6</a-menu-item>
              <a-menu-item key="7">option7</a-menu-item>
              <a-menu-item key="8">option8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <notification-outlined />
                  <span>subnav 3</span>
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
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
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
export default {
  name: 'LoGin',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
  },
  data() {
    return {
      selectedKeys1: ['2'],
      selectedWeb: ['1'],
      openKeys: ['sub1'],
      collapsed: false,
      state: {
        mode: 'inline',
        theme: 'light',
        selectedKeys: ['1'],
        openKeys: ['sub1'],
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {},
  // Vue方法定义
  methods: {
    changeMode(checked) {
      this.state.mode = checked ? 'vertical' : 'inline';
    },
    changeTheme(checked) {
      this.state.theme = checked ? 'dark' : 'light';
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
    .anticon-menu-fold {
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