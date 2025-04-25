import { createRouter, createWebHistory } from 'vue-router';
import roles from './modules/roles.js';
import clients from './modules/clients.js';
import authentication from './modules/authentication.js';
import setting from './modules/settings.js';
import {
  UsergroupAddOutlined,TrademarkCircleOutlined,
  ProfileOutlined, SettingOutlined, WalletOutlined,
  UserAddOutlined, UserSwitchOutlined, UngroupOutlined,
  FundProjectionScreenOutlined,FireOutlined,FileSyncOutlined,
} from '@ant-design/icons-vue';
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
    redirect: '/home/clients',
    children: [
      {
        path: 'clients',
        name: 'Clients',
        component: () => import('@/views/manage/clients/index.vue'),
        redirect: '/home/clients/list',
        meta: {
          title: 'clients',
          icon: h(ProfileOutlined),
          pathname: '/home/clients',
          type: 'Manage',
        },
        children: clients
      },
      {
        path: 'client-scopes',
        name: 'ClientScopes',
        component: () => import('@/views/manage/client-scopes/index.vue'),
        meta: {
          title: 'clientScopes',
          icon: h(FileSyncOutlined),
          pathname: '/home/client-scopes',
          type: 'Manage'
        },
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/manage/roles/index.vue'),
        redirect: '/home/roles/list',
        meta: {
          title: 'titleRoles',
          icon: h(TrademarkCircleOutlined),
          pathname: '/home/roles',
          type: 'Manage'
        },
        children: roles
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/manage/users/index.vue'),
        meta: {
          title: 'users',
          icon: h(UserAddOutlined),
          pathname: '/home/users',
          type: 'Manage'
        },
      },
      {
        path: 'groups',
        name: 'Groups',
        component: () => import('@/views/manage/groups/Groups.vue'),
        meta: {
          title: 'groups',
          icon: h(UsergroupAddOutlined),
          pathname: '/home/groups',
          type: 'Manage'
        },
      },

      {
        path: 'sessions',
        name: 'Sessions',
        component: () => import('@/views/manage/sessions/Sessions.vue'),
        meta: {
          title: 'sessions',
          icon: h(FundProjectionScreenOutlined),
          pathname: '/home/sessions',
          type: 'Manage'
        },
      },

      {
        path: 'events',
        name: 'Events',
        component: () => import('@/views/manage/events/index.vue'),
        meta: {
          title: 'events',
          icon: h(FireOutlined),
          pathname: '/home/events',
          type: 'Manage'
        },
      },


      {
        path: 'realm-settings',
        name: 'RealmSettings',
        component: () => import('@/views/configure/realm-settings/index.vue'),
        redirect: '/home/realm-settings/login',
        meta: {
          title: 'realmSettings',
          icon: h(SettingOutlined),
          pathname: '/home/realm-settings',
          type: 'Configure'
        },
        children: setting

      },

    
      {
        path: 'authentication',
        name: 'Authentication',
        component: () => import('@/views/configure/authentication/index.vue'),
        redirect: '/home/authentication/flows',
        meta: {
          title: 'authentication',
          icon: h(UngroupOutlined),
          pathname: '/home/authentication',
          type: 'Configure'
        },
        children: authentication
      },

      {
        path: 'identity-providers',
        name: 'IdentityProviders',
        component: () => import('@/views/configure/identity-providers/index.vue'),
        meta: {
          title: 'identityProviders',
          icon: h(WalletOutlined),
          pathname: '/home/identity-providers',
          type: 'Configure'
        },
      },

      {
        path: 'user-federation',
        name: 'UserFederation',
        component: () => import('@/views/configure/user-federation/UserFederation.vue'),
        meta: {
          title: 'userFederation',
          icon: h(UserSwitchOutlined),
          pathname: '/home/user-federation',
          type: 'Configure'
        },
      },
      
      {
        path: 'add-realm',
        name: 'CreateRealm',
        component: () => import('@/views/manage/realms/CreateRealm.vue'),
        meta: {
          title: 'createRealm',
          pathname: '/home/add-realm',
          type: 'realm'
        },
      },
      {
        path: 'realm-details',
        name: 'DetailsRealm',
        component: () => import('@/views/manage/realms/DetailsRealm.vue'),
        meta: {
          title: 'createRealm',
          pathname: '/home/realm-details',
          type: 'realm'
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