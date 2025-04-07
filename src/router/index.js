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
          type: 'Manage'
        },
        children: [
          {
            path: 'new',
            name: 'CreateRealmRole',
            component: () => import('@/views/menu/roles/roleCreate.vue'),
            meta: {
              pathname: '/home/roles/new',
              keepAlive: false
            },
          },
          {
            path: 'details',
            name: 'DetailsRealmRole',
            component: () => import('@/views/menu/roles/roleDetails.vue'),
            meta: {
              title: 'Details',
              keepAlive: true
            },
          },
          {
            path: 'associated-roles',
            name: 'AssociatedRealmRole',
            component: () => import('@/views/menu/roles/roleAssociated.vue'),
            meta: {
              title: 'Associated roles',
              keepAlive: true
            },
          },
          {
            path: 'attributes',
            name: 'Attributes',
            component: () => import('@/views/menu/roles/roleDetails.vue'),
            meta: {
              title: 'Attributes',
              keepAlive: true
            },
          },
          {
            path: 'users-in-role',
            name: 'UsersInRole',
            component: () => import('@/views/menu/roles/roleDetails.vue'),
            meta: {
              title: 'Users in role',
              keepAlive: true
            },
          },
          {
            path: 'events',
            name: 'RoleEvents',
            component: () => import('@/views/menu/roles/roleDetails.vue'),
            meta: {
              title: 'Admin events',
              keepAlive: true
            },
          },
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/menu/Menu2.vue'),
        meta: {
          title: 'Clients',
          icon: h(NotificationOutlined),
          pathname: '/home/menu2',
          type: 'Manage'
        },
      },
      {
        path: 'menu3',
        name: 'Menu3',
        component: () => import('@/views/menu/Menu3.vue'),
        meta: {
          title: 'Client scopes',
          icon: h(LaptopOutlined),
          pathname: '/home/menu3',
          type: 'Manage'
        },
      },
      {
        path: 'realm-settings',
        name: 'RealmSettings',
        component: () => import('@/views/menu/RealmSettings.vue'),
        meta: {
          title: 'Realm settings',
          icon: h(LaptopOutlined),
          pathname: '/home/realm-settings',
          type: 'Configure'
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