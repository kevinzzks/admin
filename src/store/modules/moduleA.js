export default {
    namespaced: true,
    state: {
      exampleStateA: 'Hello from Module A'
    },
    mutations: {
      setExampleStateA(state, payload) {
        state.exampleStateA = payload;
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