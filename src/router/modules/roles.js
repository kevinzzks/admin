export default
    [
        {
            path: 'new',
            name: 'CreateRealmRole',
            component: () => import('@/views/manage/roles/roleCreate.vue'),
            meta: {
                pathname: '/home/roles/new',
                keepAlive: false
            },
        },
        {
            path: 'details',
            name: 'DetailsRealmRole',
            component: () => import('@/views/manage/roles/roleDetails.vue'),
            meta: {
                title: 'Details',
                keepAlive: true
            },
        },
        {
            path: 'associated-roles',
            name: 'AssociatedRealmRole',
            component: () => import('@/views/manage/roles/roleAssociated.vue'),
            meta: {
                title: 'Associated roles',
                keepAlive: true
            },
        },
        {
            path: 'attributes',
            name: 'Attributes',
            component: () => import('@/views/manage/roles/roleDetails.vue'),
            meta: {
                title: 'Attributes',
                keepAlive: true
            },
        },
        {
            path: 'users-in-role',
            name: 'UsersInRole',
            component: () => import('@/views/manage/roles/roleDetails.vue'),
            meta: {
                title: 'Users in role',
                keepAlive: true
            },
        },
        {
            path: 'events',
            name: 'RoleEvents',
            component: () => import('@/views/manage/roles/roleDetails.vue'),
            meta: {
                title: 'Admin events',
                keepAlive: true
            },
        },
    ]
