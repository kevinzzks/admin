import api from '@/api/index.js'
import Cookies from 'js-cookie'
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
      },
      async getToken() {
        const token = Cookies.get('refresh_token')
        if (token) {
          let res = await api.getToken({ token }, 'token')
          if (res.status === 200) {
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