import { createStore } from 'vuex';
import login from './modules/login';
import home from './modules/home';
import local from './modules/local';

// 创建自定义插件
const persistedState = (store) => {
  // 从 localStorage 获取数据
  const savedState = localStorage.getItem('AppKey');
  if (savedState) {
    store.replaceState({
      ...store.state,
      ...JSON.parse(savedState)
    });
  }

  // 监听 state 变化
  store.subscribe((mutation, state) => {
    localStorage.setItem('AppKey', JSON.stringify({
      eternal: state.eternal
    }));
  });
};

const store = createStore({
  modules: {
    login,
    home,
    local
  },
  plugins: [persistedState],
});

export default store;