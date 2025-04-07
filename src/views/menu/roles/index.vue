<!-- Dom模板 -->
<template>
    <RealmRuler v-if="this.$route.name == 'Roles'" />
    <RoleChildren v-else />
</template>
  
  <script>
  import RealmRuler from './realmRoler.vue'; // 引入组件
  import RoleChildren from './children.vue';
export default {
  name: 'LoGin',
  components: { RealmRuler,RoleChildren, },
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

