export default [
  {
    path: 'flows',
    name: 'Flows',
    component: () => import('@/views/configure/authentication/Flows.vue'),
    meta: {
      keepAlive: true,
      title: 'flows',
    },
  },
  {
    path: 'required-actions',
    name: 'RequiredActions',
    component: () => import('@/views/configure/authentication/requiredActions.vue'),
    meta: {
      keepAlive: true,
      title: "requiredActions"
    },
  },
  {
    path: 'policies',
    name: 'Policies',
    component: () => import('@/views/configure/authentication/policies.vue'),
    meta: {
      keepAlive: true,
      title: "policies",
    },
  },
  
  // {
  //   path: 'settings',
  //   name: 'ClientSettings',
  //   component: () => import('@/views/configure/authentication/ClientSettings.vue'),
  //   meta: {
  //     title: 'Client settings',
  //     keepAlive: false
  //   },
  // },
 
]