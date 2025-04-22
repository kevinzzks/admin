<!-- Dom模板 -->
<template>
  <div>
    <!-- Dom内容 -->
    <a-layout class="login-layout" style="height: 100vh; background: #fff">
      <a-layout-header class="header" style="background: #fff; padding: 0">
        <div class="logo" />
        <a-menu
          mode="horizontal"
          default-selected-keys="['1']"
          theme="light"
          style="line-height: 64px"
        >
          <a-menu-item key="1">登录</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 24px; background: #fff; min-height: 280px">
        <div class="login-form" style="width: 300px; margin: 0 auto; padding-top: 50px">
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item
              label="Password"
              name="password"
              :rules="[{ required: true, message: 'Please input your password!' }]"
            >
              <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>-->

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit">Submit</a-button>
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
  data() {
    return {
      formState: {
        username: 'admin',
        password: '0',
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$store.commit('login/setClient', this.$route.query);
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // async function parseProperties(url) {
    //   const response = await fetch(url);
    //   const text = await response.text();
    //   const lines = text.split('\n');
    //   const data = {};
    //   lines.forEach(line => {
    //     if (line.trim() && !line.startsWith('#')) {
    //       const [rawKey, ...rawValue] = line.split('=');
    //       const key = rawKey.trim().replace(/\\=/g, '='); // 处理键中的转义符
    //       const value = rawValue.join('=').trim().replace(/\\=/g, '='); // 处理值中的转义符
    //       data[key] = value;
    //     }
    //   });
    //   return data;
    // }

    // // 使用示例
    // parseProperties('./messages/messages_sl.properties').then(data => {
    //   console.log(data); // 输出 "Hello=World"
    // }).catch(error => {
    //   console.error('Error loading properties:', error);
    // });
  },
  computed: {},
  // Vue方法定义
  methods: {
    onFinish(values) {
      api.getToken(values, 'password').then(res => {
        this.$store.commit('login/setClient', { ...this.$store.state.login.client, ...res.data });
        if (res.status == 200) {
          // 设置 Axios 的全局请求头
          let { access_token, refresh_token } = res.data;
          this.$Cookies.set('access_token', access_token, 1); // 设置 Cookie，有效期为 1 天
          this.$Cookies.set('refresh_token', refresh_token, 1)
          this.$message.success('登录成功！')
          this.$router.push({ path: '/home' })
        } else {
          this.$message.error('登录失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo)
    },
  }
}
</script>

<style scoped>
/*@import url(''); 引入css类*/
</style>