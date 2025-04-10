<!-- Dom模板 -->
<template>
  <div>
    <div class="custom-page-header">
      <h2 class="page-title">Clients</h2>
      <p class="page-description">
        Clients are applications and services that can request authentication of a user.
        <a
          href="https://www.keycloak.org/docs/latest/server_admin/index.html#assembly-managing-clients_server_administration_guide"
        >
          Learn more
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
    <router-view />
  </div>
</template>
    
    <script>
import { ExportOutlined } from '@ant-design/icons-vue';
export default {
  name: 'AuthenTication',
  components: { ExportOutlined },
  data() {
    return {
     
      current: ['ClientsList'],
      items: [],
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    console.log(this.$router.options.routes[1].children[0]);
    let itemList = this.$router.options.routes[1].children[0].children;

    itemList.forEach(item => {
      const menuItem = {
        key: item.name,
        label: item.meta.title,
      };
      if (item.meta.keepAlive) this.items.push(menuItem);
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
  
  