<!-- Dom模板 -->
<template>
  <div>
    <div class="custom-page-header">
      <h2 class="page-title">{{ $t('manageRealms') }}</h2>
    </div>
   
   
  </div>
</template>
    
<script>
// import api from '@/api/index';
import {  } from '@ant-design/icons-vue'; // 添加 ExportOutlined 图标

export default {
  name: 'RealmHeader',
  components: {  }, // 注册 ExportOutlined 组件
  data() {
    return {
      current: ['ClientsList'],
      items: [],
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    // let itemList = this.$router.options.routes[1].children.find(route => route.name === 'Realms')?.children || [];
    // itemList.forEach(item => {
    //   const menuItem = {
    //     key: item.name,
    //   };
    //   if (item.meta.keepAlive) {
    //     menuItem.label = this.$t(item.meta.title);
    //     this.items.push(menuItem);
    //   }
    // });

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
</style>

