import http from '@/utils/request'
import store from "@/store/index.js"
// Session 获取会话列表
async function getSessions(data) {
    let realm = store.state.local.realm;
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
// Session 登出会话
async function delSession(data) {
    let realm = store.state.local.realm;
    
    return await http({
        method: "DELETE",
        url: http.adornUrl(`/admin/realms/${realm}/sessions/${data.id}?isOffline:false`),
        params: {},
        withCredentials: true
    })
}
// Session 批量登出会话
async function delSessions() {
    let realm = store.state.local.realm;
    return await http({
        method: "POST",
        url: http.adornUrl(`/admin/realms/${realm}/logout-all`),
        data: '{}',
        withCredentials: true
    })
}
export default {
    getSessions,delSession,delSessions,
};