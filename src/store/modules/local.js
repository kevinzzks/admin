export default {
    namespaced: true,
    state: {
        clientId: 'myclient',
        realm: 'krealm',
    },
    mutations: {
        setClientId(state, payload) {
            state.clientId = payload;
        },
        setRealmName(state, payload) {
            state.realm = payload;
        },
    },
    actions: {

    },
    getters: {

    }
};