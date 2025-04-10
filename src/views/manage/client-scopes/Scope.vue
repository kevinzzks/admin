<template>
  <div class="role-associated">
    No roles in this realm
    You haven't created any roles in this realm. Create a role to get started.
  </div>
</template>

<script>
// import api from '@/api/index.js';
export default {
  name: 'SCOPE',
  components: {},
  // inheritAttrs: false,
  // props: ['mess'],
  data() {
    return {
      routes: [
        {
          path: '/home/roles',
          breadcrumbName: 'Realm roles',
        },
        {
          path: '',
          breadcrumbName: 'Create role',
        },

      ],
      current: ['DetailsRealmRole'],
      items: []
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    let itemList = this.$router.options.routes[1].children[2].children
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

}


</script>

<style scoped lang="scss">
.ant-page-header {
  padding-left: 0;
}
</style>