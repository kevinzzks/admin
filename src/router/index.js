import { createRouter, createWebHistory } from 'vue-router';
// import { UserOutlined, LaptopOutlined } from '@ant-design/icons-vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
 
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home.vue'),
    redirect: '/home/menu1',
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('@/views/menu/Menu1.vue'),
        meta: {
          title: '账号管理',
          icon: h(UserOutlined),
          pathname: '/home/menu1',
          keepAlive: true
        },
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/menu/Menu2.vue'),
        meta: {
          title: '系统管理',
          icon: h(NotificationOutlined),
          pathname: '/home/menu2',
          keepAlive: true
        },
      },
      {
        path: 'menu3',
        name: 'Menu3',
        component: () => import('@/views/menu/Menu3.vue'),
        meta: {
          title: '权限管理',
          icon: h(LaptopOutlined),
          pathname: '/home/menu3',
          keepAlive: true
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;


{/* */}