export default {
    namespaced: true,
    state: {
      exampleStateA: 'Hello from Module A',
      client: {},
      realm: 'master',
    },
    mutations: {
      setExampleStateA(state, payload) {
        state.exampleStateA = payload;
      },
      setClient(state, payload) {
        state.client = payload;
      },
      setRealm(state, payload) {
        state.realm = payload;
      }
    },
    actions: {
      updateExampleStateA({ commit }, payload) {
        commit('setExampleStateA', payload);
      }
    },
    getters: {
      exampleStateA: (state) => state.exampleStateA
    }
  };