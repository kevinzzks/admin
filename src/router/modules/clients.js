export default [
  {
    path: 'add-client',
    name: 'CreateRealmRole',
    component: () => import('@/views/manage/clients/ClientCreate.vue'),
    meta: {
      keepAlive: false
    },
  },
  {
    path: 'list',
    name: 'ClientsList',
    component: () => import('@/views/manage/clients/ClientsList.vue'),
    meta: {
      title: 'Clients list',
      keepAlive: true
    },
  },
  {
    path: 'initial-access-token',
    name: 'InitialAccessToken',
    component: () => import('@/views/manage/clients/InitialAccessToken.vue'),
    meta: {
      title: 'Initial access token',
      keepAlive: true
    },
  },
  {
    path: 'client-registration',
    name: 'ClientRegistration',
    component: () => import('@/views/manage/clients/ClientRegistration.vue'),
    meta: {
      title: 'Client registration',
      keepAlive: true
    },
  },
  {
    path: 'settings',
    name: 'ClientSettings',
    component: () => import('@/views/manage/clients/ClientSettings.vue'),
    meta: {
      title: 'Client settings',
      keepAlive: false
    },
  },
 
]