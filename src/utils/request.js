import axios from "axios";
// import store from "../store/index.js"
const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config) => {
    // let local = store.state.eternal.lang;
    // config.headers['Accept-Language'] = local + ',zh;q=0.9,sv;q=0.8,my;q=0.7,sq;q=0.6,fr;q=0.5';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (response) => {
    // console.log('响应拦截器收到响应:', response.data);
    return response;
  },
  (error) => {
    console.error('响应拦截器捕获错误:', error);
    // 'USS-0150' 只要出现这个错误，就跳转到错误页面
    // if (error.response && error.response.data && error.response.data.code == 'USS-0150') {
    //   let data = JSON.parse(error.response.data.data);
    //   store.commit('ruler/setlinkError', {
    //     CorrelationID: data.id,
    //     Timestamp: data.time,
    //   });
    //   store.commit("ruler/setStep",11);
    // }
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */

http.adornUrl = (actionName) => {
  // 非生产环境, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (
    (process.env.NODE_ENV !== "production"
      ? "/proxyApi"
      : location.origin) + actionName
  );
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?

 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 */
http.adornData = (data = {}) => {
  return JSON.stringify(data)
}
http.getLang = async (locale) => {
  let defaultUrl = http.adornUrl(`/language/${locale}.json?${new Date().getTime() / (1000 * 60 * 30)}`);
  return await http({
      method: "get",
      url: defaultUrl,
      withCredentials: true
  })
}
http.getWeak = async () => {
  let defaultUrl = http.adornUrl(`/IECFAPI/js/weak.json`);
  return await http({
    method: "get",
    url: defaultUrl,
    withCredentials: true
  })
}
http.getTransaction = async () => {
  let defaultUrl = http.adornUrl(`/glbwebauthnv6/auth/v1/transaction`);
  return await http({
    method: "get",
    url: defaultUrl,
    withCredentials: true
  })
}
export default http;
