import http from '@/utils/request'
import store from "@/store/index.js"
// 登录
async function getToken(data, type) {
    let realm = store.state.login.realm;
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
        url: http.adornUrl(`/realms/${realm}/protocol/openid-connect/token`), // 修改为正确的路径
        data: params.toString(),
        withCredentials: true,
    })
}
// 登出
async function logout(refreshToken) {
    let realm = store.state.login.realm;
    const params = new URLSearchParams();
    params.append('client_id', 'myclient'); // 替换为你的客户端 ID
    params.append('refresh_token', refreshToken); // 替换为登录时返回的 refresh_token

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
// 获取会话列表
async function getSessions(data) {
    let realm = store.state.login.realm;
    let pushDate = {
        "first": data.first,
        "max": data.max,
        "type": data.type || "ALL",
        "search": data.search || "",
    }
    return await http({
        method: "GET",
        url: http.adornUrl(`/admin/realms/${realm}/ui-ext/sessions`),
        params: pushDate,
        withCredentials: true
    })
}
// 登出会话
async function delSession(data) {
    let realm = store.state.login.realm;
    
    return await http({
        method: "DELETE",
        url: http.adornUrl(`/admin/realms/${realm}/sessions/${data.id}?isOffline:false`),
        params: {},
        withCredentials: true
    })
}
// 批量登出会话
async function delSessions() {
    let realm = store.state.login.realm;
    return await http({
        method: "POST",
        url: http.adornUrl(`/admin/realms/${realm}/logout-all`),
        data: '{}',
        withCredentials: true
    })
}

// sessions/e121b124-b082-4db6-a826-352d59d5b905?isOffline=false
export default {
    getToken,
    logout, // 添加登出方法
    getSessions,delSession,delSessions,
};