<!-- Dom模板 -->
<template>
  <div>
    <!-- Dom内容 -->
    <a-layout class="login-layout" style="height: 100vh; background: #fff">
      <a-layout-header class="header" style="background: #fff; padding: 0">
        <div class="logo" />
        <a-menu mode="horizontal" default-selected-keys="['1']" theme="light" style="line-height: 64px">
          <a-menu-item key="1">登录</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 24px; background: #fff; min-height: 280px">
        <div class="login-form" style="width: 300px; margin: 0 auto; padding-top: 50px">
          <a-form layout="vertical">
            <a-form-item label="用户名">
              <a-input placeholder="请输入用户名" v-model:value="user.username" />
            </a-form-item>
            <a-form-item label="密码">
              <a-input-password v-model:value="user.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" @click="submitClick" style="width: 100%">
                登录
              </a-button>
            </a-form-item>
          </a-form> 
        </div>
      </a-layout-content>
      </a-layout>
     
  </div>
</template>

<script>
// import  from ''; // 引入组件
import api from '@/api/index.js';
export default {
  name: 'LoGin',
  components: {},
  // inheritAttrs: false,
  // props: ['mess'],
  data() {
    return {
      user:{
        username: '',
        password: ''
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() { },
  computed: {},
  // Vue方法定义
  methods: {
    submitClick() {
      console.log(this.user)
      api.checkPLogin(this.user).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success('登录成功！')
          this.$router.push({ path: '/home' })
        } else {
          this.$message.error('登录失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
      
    }
  }
}
</script>

<style scoped>
/*@import url(''); 引入css类*/
</style>