export default {
    namespaced: true,
    state: {
      exampleStateB: 'Hello from Module B'
    },
    mutations: {
      setExampleStateB(state, payload) {
        state.exampleStateB = payload;
      }
    },
    actions: {
      updateExampleStateB({ commit }, payload) {
        commit('setExampleStateB', payload);
      }
    },
    getters: {
      exampleStateB: (state) => state.exampleStateB
    }
  };