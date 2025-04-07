export default {
    namespaced: true,
    state: {
      roleDetails:{}
    },
    mutations: {
      setRoleDetails(state, payload) {
        state.roleDetails = {
          ...state.roleDetails,
          ...payload
        };
      }
    },
    actions: {
     
    },
    getters: {
      
    }
  };