import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store'; // 引入 Vuex Store
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import http from './utils/request';
import Cookies from "js-cookie"; 
const app = createApp(App);

app.config.globalProperties.$http = http;
app.config.globalProperties.$baseUrl = location.origin;

app.config.globalProperties.$Cookies = Cookies; // 将 Cookies 添加到全局属性中

app.use(store); // 使用 Vuex Store
app.use(router);
app.use(Antd);

app.mount('#app');