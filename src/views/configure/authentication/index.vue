<!-- Dom模板 -->
<template>
  <div>
    <Header> </Header>
    <router-view />
  </div>
</template>
    
    <script>
import {  } from '@ant-design/icons-vue';
import Header from './header.vue';
export default {
  name: 'AuthenTication',
  components: {  Header},
  data() {
    return {
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
      created() {
    
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {},
  // Vue方法定义
  methods: {
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
  
  