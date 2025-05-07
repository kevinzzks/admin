import http from '@/utils/request'
// import store from "@/store/index.js"
// 登录
async function getToken(data, type) {
    // let { realm, clientId } = store.state.login;
    let realm = 'master';
    const params = new URLSearchParams();
    params.append('client_id', 'admin-cli');
    if (type == 'password') {
        params.append('grant_type', 'password');
        params.append('username', data.username);
        params.append('password', data.password);
        // params.append('username', 'kevin');
        // params.append('password', '123');
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
        url: http.adornUrl(`/realms/${realm}/protocol/openid-connect/token`), // 修改为正确的路径
        data: params.toString(),
        withCredentials: true,
    })
}
// 登出
async function logout(refreshToken) {
    let realm = 'master';
    const params = new URLSearchParams();
    params.append('client_id', 'admin-cli');
    params.append('refresh_token', refreshToken);

    return await http({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: http.adornUrl(`/realms/${realm}/protocol/openid-connect/logout`),
        data: params.toString(),
        withCredentials: true,
    });
}



export default {
    getToken,
    logout, // 登出方法
};