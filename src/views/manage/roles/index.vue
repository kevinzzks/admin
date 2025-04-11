<!-- Dom模板 -->
<template>
  <div>
    <RolesHeader></RolesHeader>
    <RealmRuler v-if="this.$route.name == 'Roles'" />
    <router-view v-else />
  </div>
</template>
  
  <script>
import RealmRuler from './realmRoler.vue'; // 引入组件
import RolesHeader from './rolesHeader.vue';

import api from '@/api/index';
export default {
  name: 'ROLES',
  components: { RealmRuler, RolesHeader },
  // inheritAttrs: false,
  // props: ['mess'],
  data() {
    return {

    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {

    },
  watch: {
    '$route.name'(newName) {
      console.log(newName);
      if (newName === 'DetailsRealmRole') {
        this.getRealmRole();
      }
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {},
  // Vue方法定义
  methods: {
    async getRealmRole() {
      const id = this.$route.query.id; // 从路由参数中获取 id
      if (id) {
        // 调用获取角色详情的方法
        await this.$store.dispatch('login/getToken', {});
        api.getRealmRole({ id: id }, 'id').then((res) => {
          if (res.status === 200) {
            this.$store.commit('home/setRoleDetails', res.data); // 将角色详情存储到 Vuex 中
            this.$message.success('Role details fetched successfully!');
          } else {
            this.$message.error('Failed to fetch role details');
          }
        }).catch(() => {
          this.$message.error('Error fetching role details');
        });
      } else {
        this.$message.error('No role ID found in route parameters');
      }
    },

  }
}
  </script>
  
  <style scoped>
</style>

