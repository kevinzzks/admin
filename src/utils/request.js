import axios from "axios";
import Cookies from "js-cookie"; 
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
    if (!config.headers['Authorization']) {
      // 从 Cookie 中获取 Token
      const token = Cookies.get('access_token');
      if (token) {
        // 如果 Cookie 中存在 Token，设置到请求头
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
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
