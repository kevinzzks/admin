<!-- Dom模板 -->
<template>
  <div>
    <div class="custom-page-header">
      <h2 class="page-title">{{ $t('clients') }}</h2>
      <p class="page-description">
        {{$t('clientsExplain')}}
        <a
          href="https://www.keycloak.org/docs/latest/server_admin/index.html#assembly-managing-clients_server_administration_guide"
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
    <a-modal centered v-model:open="open" :title="$t('roleDeleteConfirm')">
      <p>This action will permanently delete the role "admin" and cannot be undone.</p>
      <template #footer>
        <a-button key="back" type="text" @click="handleCancel">{{$t('cancel')}}</a-button>
        <a-button
          key="submit"
          danger
          type="primary"
          :loading="loading"
          @click="handleOk"
        >{{$t('delete')}}</a-button>
      </template>
    </a-modal>
  </div>
</template>
    
<script>
// import api from '@/api/index';
import { ExportOutlined } from '@ant-design/icons-vue'; // 添加 ExportOutlined 图标

export default {
  name: 'RolesHeader',
  components: { ExportOutlined }, // 注册 ExportOutlined 组件
  data() {
    return {
      current: ['ClientsList'],
      items: [],
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    let itemList = this.$router.options.routes[1].children.find(route => route.name === 'Clients')?.children || [];
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
  mounted() {

  },
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

