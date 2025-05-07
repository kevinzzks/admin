import api from '@/api/index.js'
import Cookies from 'js-cookie'
export default {
    namespaced: true,
    state: {
      exampleStateA: 'Hello from Module A',
      client: {},
      realmBase: 'master',
      clientIdBase: 'admin-cli',
      realmDetails: {},
    },
    mutations: {
      setExampleStateA(state, payload) {
        state.exampleStateA = payload;
      },
     
      setClient(state, payload) {
        state.client = payload;
      },
     
      setClientIdBase(state, payload) {
        state.clientIdBase = payload;
      },
      setRealmBase(state, payload) {
        state.realmBase = payload;
      },
      setRealmDetails(state, payload) {
        console.log(payload);
        
        state.realmDetails = {
          ...state.realmDetails,
          ...payload
        };
      },
    },
    actions: {
      updateExampleStateA({ commit }, payload) {
        commit('setExampleStateA', payload);
      },
      async getToken() {
        const token = Cookies.get('refresh_token')
        if (token) {
          let res = await api.getToken({ token }, 'token').then().catch((err) => {
            console.log(err)
          })
          if (res && res.status === 200) {
            Cookies.set('access_token', res.data.access_token, { expires: 1 })
            Cookies.set('refresh_token', res.data.refresh_token, { expires: 1 })
          }
        }
      },
    },
    getters: {
      exampleStateA: (state) => state.exampleStateA
    }
  };