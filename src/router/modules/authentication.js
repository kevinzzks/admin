export default [
  {
    path: 'flows',
    name: 'Flows',
    component: () => import('@/views/configure/authentication/Flows.vue'),
    meta: {
      keepAlive: true,
      title: 'Flows',
    },
  },
  {
    path: 'required-actions',
    name: 'RequiredActions',
    component: () => import('@/views/configure/authentication/requiredActions.vue'),
    meta: {
      keepAlive: true,
      title: "Required actions"
    },
  },
  {
    path: 'policies',
    name: 'Policies',
    component: () => import('@/views/configure/authentication/policies.vue'),
    meta: {
      keepAlive: true,
      title: "Policies",
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