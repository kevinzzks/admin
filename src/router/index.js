import { createRouter, createWebHistory } from 'vue-router';
// import { UserOutlined, LaptopOutlined } from '@ant-design/icons-vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    pathname: '/home',
    component: () => import('@/views/HOME.vue'),
    redirect: '/home/menu1',
    children: [
      {
        path: 'menu1',
        key: 'menu1',
        pathname: '/home/menu1',
        name: 'Menu1',
        component: () => import('@/views/menu/Menu1.vue'),
        label: '账号管理',
        icon: UserOutlined
      },
      {
        path: 'menu2',
        pathname: '/home/menu2',
        name: 'Menu2',
        component: () => import('@/views/menu/Menu2.vue'),
        label: '系统管理',
        icon: NotificationOutlined
      },
      {
        path: 'menu3',
        pathname: '/home/menu3',
        name: 'Menu3',
        component: () => import('@/views/menu/Menu3.vue'),
        label: '个人信息管理',
        icon: LaptopOutlined
      },
      {
        path: 'nav1',
        component: () => import('@/views/menu/Nav1.vue'),
        redirect: '/home/nav1/navsub1',
        label: '配置管理',
        icon: LaptopOutlined,
        children: [
          {
            path: 'navsub1',
            pathname: '/home/nav1/navsub1',
            name: 'Sub1',
            component: () => import('@/views/menu/Nav1Sub1.vue'),
            label: '子菜单一',
            icon: LaptopOutlined
          },
          {
            path: 'navsub2',
            pathname: '/home/nav1/navsub2',
            name: 'Sub2',
            component: () => import('@/views/menu/Nav1Sub2.vue'),
            label: '子菜单二',
            icon: LaptopOutlined
          }
        ]
      },
      {
        path: 'nav2',
        component: () => import('@/views/menu/Nav2.vue'),
        redirect: '/home/nav2/navsub3',
        label: '日志管理',
        icon: LaptopOutlined,
        children: [
          {
            path: 'navsub3',
            pathname: '/home/nav2/navsub3',
            name: 'Sub3',
            component: () => import('@/views/menu/Nav1Sub3.vue'),
            label: '子菜单三',
            icon: LaptopOutlined
          },
          {
            path: 'navsub4',
            pathname: '/home/nav2/navsub4',
            name: 'Sub4',
            component: () => import('@/views/menu/Nav1Sub4.vue'),
            label: '子菜单四',
            icon: LaptopOutlined
          },
          {
            path: 'nav3',
            name: 'Sub5',
            component: () => import('@/views/menu/Nav3.vue'),
            redirect: '/home/nav2/navsub6',
            label: '子菜单五',
            icon: LaptopOutlined,
            children: [
              {
                path: 'navsub5',
                pathname: '/home/nav2/nav3/navsub5',
                name: 'Sub6',
                component: () => import('@/views/menu/Nav1Sub5.vue'),
                label: '子菜单六'
              },
              {
                path: 'navsub6',
                pathname: '/home/nav2/nav3/navsub6',
                name: 'Sub7',
                component: () => import('@/views/menu/Nav1Sub6.vue'),
                label: '子菜单七'
              }
            ]
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;


{/* */}