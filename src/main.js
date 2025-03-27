import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store'; // 引入 Vuex Store
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(store); // 使用 Vuex Store
app.use(router);
app.use(Antd);

app.mount('#app');