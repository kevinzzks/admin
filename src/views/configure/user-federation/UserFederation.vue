<!-- Dom模板 -->
<template>
  <div>
    <div class="custom-page-header">
      <div>
        <h2 class="page-title">User federation</h2>
        <p class="page-description">
          User federation provides access to external databases and directories, such as LDAP and Active Directory.
          <a
            href="https://www.keycloak.org/docs/latest/server_admin/index.html#_user-storage-federation"
          >
            Learn more
            <ExportOutlined />
          </a>
        </p>
      </div>

    </div>
    
  </div>
</template>
    
<script>
// import api from '@/api/index.js';
import {
  ExportOutlined
} from '@ant-design/icons-vue';
export default {
  name: 'UserFederation',
  components: {
    ExportOutlined
  },
  data() {
    return {
      // 					
  
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    

  },

  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {
   
  },
  // Vue方法定义
  methods: {
    
  }
}
</script>
    
<style scoped>
/*@import url(''); 引入css类*/
.custom-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

</style>

