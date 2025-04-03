import { createStore } from 'vuex';
import login from './modules/login';
import moduleB from './modules/moduleB';

const store = createStore({
  modules: {
    login,
    moduleB
  }
});

export default store;