import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store'; // 引入 Vuex Store
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import http from './utils/request';
import Cookies from "js-cookie"; 
import { createI18n } from 'vue-i18n'; // 引入 vue-i18n
import messages from './locales'; // 引入语言包

const i18n = createI18n({
  locale: 'zh_CN', // 设置默认语言
  fallbackLocale: 'en', // 设置回退语言
  messages, // 语言包
});

const app = createApp(App);

app.config.globalProperties.$http = http; // 将 http 请求方法添加到全局属性中
app.config.globalProperties.$baseUrl = location.origin; // 设置基础 URL
app.config.globalProperties.$reqUrl = 'https://10.96.177.104:8443'; // 设置请求的基础 URL

app.config.globalProperties.$message = Antd.message; // 将 Ant Design 的 message 方法添加到全局属性中
app.config.globalProperties.$Cookies = Cookies; // 将 Cookies 添加到全局属性中

app.use(store); // 使用 Vuex Store
app.use(router);
app.use(Antd);
app.use(i18n); // 使用 vue-i18n

app.mount('#app');