<!-- Dom模板 -->
<template>
  <div>
    
    <Header></Header> <!-- 引入header.vue组件 -->
    <router-view />
  </div>
</template>
    
    <script>
import Header from './header.vue'; // 引入header.vue组件
export default {
  name: 'LoGin',
  components: { Header },
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

</style>
  
  