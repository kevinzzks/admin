<!-- Dom模板 -->
<template>
  <div>
    <div class="custom-page-header">
      <h2 class="page-title">{{$t('authentication')}}</h2>
      <p class="page-description">
        {{ $t('authenticationExplain') }}
        <a
          href="https://www.keycloak.org/docs/latest/server_admin/index.html#configuring-authentication"
        >
          {{ $t('learnMore') }}
          <ExportOutlined />
        </a>
      </p>
    </div>
    <a-menu
      @click="goChildren"
      class="horizontal-header"
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
    />
  </div>
</template>
    
    <script>
import { ExportOutlined } from '@ant-design/icons-vue';
export default {
  name: 'AuthenTication',
  components: { ExportOutlined },
  data() {
    return {

      current: ['Flows'],
      items: [],
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    let itemList = this.$router.options.routes[1].children.find(route => route.name === 'Authentication')?.children || [];

    itemList.forEach(item => {
      const menuItem = {
        key: item.name,
      };
      if (item.meta.keepAlive) {
        menuItem.label = this.$t(item.meta.title);
        this.items.push(menuItem);
      }
    });

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {},
  // Vue方法定义
  methods: {
    goChildren(e) {
      this.$router.push({ name: e.key });
    },
  }
}
    </script>
    
    <style scoped></style>
  
  