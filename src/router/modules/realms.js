export default
    [
        {
            path: 'list',
            name: 'realmsList',
            component: () => import('@/views/realms/realmList.vue'),
            meta: {
                pathname: '/home/realms/list',
                keepAlive: true
            },
        },
        {
            path: 'navigation',
            name: 'RealmNavigation',
            component: () => import('@/views/realms/navigation.vue'),
            meta: {
                pathname: '/home/realms/navigation',
                keepAlive: false
            },
        },
        {
            path: 'welcome',
            name: 'RealmWelcome',
            component: () => import('@/views/realms/welcome.vue'),
            meta: {
                title: 'Welcome',
                keepAlive: false
            },
        },
        {
            path: 'info',
            name: 'Server info',
            component: () => import('@/views/realms/info.vue'),
            meta: {
                title: 'Associated roles',
                keepAlive: false
            },
        },
        {
            path: 'providers',
            name: 'RealmProviders',
            component: () => import('@/views/realms/providers.vue'),
            meta: {
                title: 'Provider info',
                keepAlive: false
            },
        },
       
    ]
