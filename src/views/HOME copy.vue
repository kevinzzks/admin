<template>
  <a-layout class="layout-demo">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <a-menu
        :defaultOpenKeys="['/home/menu1']"
        :selectedKeys="[defaultKey]"
        @click="onClickMenuItem"
      >
        <template v-for="item in menuData" :key="item.pathname">
          <!-- 普通菜单项 -->
          <a-menu-item v-if="!item.children" :key="item.pathname">
            <component :is="item.icon" v-if="item.icon" />
            {{ item.title }}
          </a-menu-item>

          <!-- 嵌套子菜单 -->
          <a-sub-menu v-else :key="item.pathname">
            <template #title>
              <span>
                <component :is="item.icon" v-if="item.icon" />
                {{ item.title }}
              </span>
            </template>

            <!-- 递归渲染子菜单 -->
            <template v-for="child in item.children" :key="child.pathname">
              <a-menu-item v-if="!child.children" :key="child.pathname">
                {{ child.title }}
              </a-menu-item>

              <a-sub-menu v-else :key="child.pathname">
                <template #title>{{ child.title }}</template>
                <a-menu-item
                  v-for="subChild in child.children"
                  :key="subChild.pathname"
                >{{ subChild.title }}</a-menu-item>
              </a-sub-menu>
            </template>
          </a-sub-menu>
        </template>
      </a-menu> 
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>




<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import {
  MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined, UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  },
  setup() {
    const selectedKeys = ref(['1']);
    const router = useRouter();
    const route = useRoute();
    const collapsed = ref(false);
    const onCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    onMounted(() => { });

    const defaultKey = computed(() => {
      let pathKey = route.path;
      if (pathKey === '/home') {
        return '/home/menu1';
      }
      return pathKey;
    });
    const allRoutes = router.options.routes;
    let menuData = allRoutes[1].children;

    return {
      collapsed,
      onCollapse,
      menuData,
      defaultKey,
      selectedKeys,
      onClickMenuItem({ key }) {
        router.push(key);
        message.info(`You selected ${key}`);
      },
    };
  },
});
</script>
<style scoped>
.layout-demo {
  height: 1000px;
  background: #f0f2f5;
}
.layout-demo .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.layout-demo .ant-layout-header {
  background: #fff;
  padding: 0 16px;
}
.layout-demo .ant-layout-footer {
  text-align: center;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
