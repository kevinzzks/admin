import { createStore } from 'vuex';
import login from './modules/login';
import home from './modules/home';

const store = createStore({
  modules: {
    login,
    home
  }
});

export default store;