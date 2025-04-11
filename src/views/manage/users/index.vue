<!-- Dom模板 -->
<template>
  <div>
    
  <UserHeader />
  <UserBase v-if="$route.name == 'Users'" />
    <router-view />
  </div>
  
</template>

<script>
import UserBase from './userBase.vue'; // 引入组件
import UserHeader from './userHeader.vue';
export default {
name: 'LoGin',
components: { UserBase, UserHeader },
// inheritAttrs: false,
// props: ['mess'],
data() {
  return {}
},
// 生命周期 - 创建完成（访问当前this实例）
created() {
},
// 生命周期 - 挂载完成（访问DOM元素）
mounted() { },
computed: {},
// Vue方法定义
methods: {}
}
</script>

<style scoped>
/*@import url(''); 引入css类*/
</style>

