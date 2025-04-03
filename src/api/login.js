import http from '@/utils/request'
async function checkPLogin(data) {

    console.log(1);


    if (data.username == 'admin' && data.password == '0') {
        console.log(2);
        return Promise.resolve({
            data: {
                code: 200,
                msg: '成功',
                data: {
                    token: 'admin'
                }
            }
        })
    } else {
        console.log(3);
        return Promise.resolve({
            data: {
                code: 400,
                msg: '失败',
                data: null
            }
        })
    }

    // return await http({
    //     method: "POST",
    //     url: http.adornUrl(`/realms/master/login-actions/authenticate`),
    //     data: http.adornData(pushDate),
    //     withCredentials: true
    // })
}
// 登录
async function getToken(data, type) {
    const params = new URLSearchParams();
    params.append('client_id', 'myclient');
    if (type == 'password') {
        params.append('grant_type', 'password');
        params.append('username', data.username);
        params.append('password', data.password);
    }
    if (type == 'token') {
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', data.token);
    }
    return await http({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: http.adornUrl(`/realms/master/protocol/openid-connect/token`), // 修改为正确的路径
        data: params.toString(),
        withCredentials: true,
    })
}
// 登出
async function logout(refreshToken) {
    const params = new URLSearchParams();
    params.append('client_id', 'myclient'); // 替换为你的客户端 ID
    params.append('refresh_token', refreshToken); // 替换为登录时返回的 refresh_token
  
    return await http({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url: http.adornUrl(`/realms/master/protocol/openid-connect/logout`),
      data: params.toString(),
      withCredentials: true,
    });
  }
  
  export default {
    getToken,
    checkPLogin,
    logout, // 添加登出方法
  };