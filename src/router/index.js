import { createRouter, createWebHistory } from 'vue-router';
// import { UserOutlined, LaptopOutlined } from '@ant-design/icons-vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
 
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home.vue'),
    redirect: '/home/roles',
    children: [
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/menu/roles/index.vue'),
        meta: {
          title: 'Realm roles',
          icon: h(UserOutlined),
          pathname: '/home/roles',
          keepAlive: true
        },
        children: [
          {
            path: 'new',
            name: 'CreateRealmRole',
            component: () => import('@/views/menu/roles/createRealmRole.vue'),
            meta: {
              pathname: '/home/roles/new',
              keepAlive: false
            },
          },
        ]
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
    component: () => import('@/views/login/login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;


{/* */}