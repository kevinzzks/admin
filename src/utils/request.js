import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router"; // 引入 Vue Router

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
    const token = Cookies.get('access_token');
    if (token) {
      // 如果 Cookie 中存在 Token，设置到请求头
      config.headers['Authorization'] = `Bearer ${token}`;
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
    return response;
  },
  (error) => {
    console.error('HTTP Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，可能是 token 过期或无效
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          router.push('/login');
          break;
        // case 403:
        //   // 禁止访问，可能是权限不足
        //   console.error('权限不足，请确认账号权限');
        //   break;
        case 404:
          // 资源不存在
          console.error('请求的资源不存在');
          break;
        case 500:
          // 服务器错误
          console.error('服务器内部错误');
          break;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('无法连接到服务器，请检查网络连接');
    } else {
      // 请求配置有误
      console.error('请求配置错误:', error.message);
    }
    
    return Promise.reject(error.response || error);
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
  return JSON.stringify(data);
};

http.getLang = async (locale) => {
  let defaultUrl = http.adornUrl(`/language/${locale}.json?${new Date().getTime() / (1000 * 60 * 30)}`);
  return await http({
      method: "get",
      url: defaultUrl,
      withCredentials: true
  });
};

http.getWeak = async () => {
  let defaultUrl = http.adornUrl(`/IECFAPI/js/weak.json`);
  return await http({
    method: "get",
    url: defaultUrl,
    withCredentials: true
  });
};

http.getTransaction = async () => {
  let defaultUrl = http.adornUrl(`/glbwebauthnv6/auth/v1/transaction`);
  return await http({
    method: "get",
    url: defaultUrl,
    withCredentials: true
  });
};

export default http;
