export default
    [
        {
            path: 'general',
            name: 'General',
            component: () => import('@/views/configure/realm-settings/general.vue'),
            meta: {
                title: 'general',
                keepAlive: true
            },
        },
        {
            path: 'login',
            name: 'SettingLogin',
            component: () => import('@/views/configure/realm-settings/login.vue'),
            meta: {
                title: 'general',
                keepAlive: true
            },
        },
    ]