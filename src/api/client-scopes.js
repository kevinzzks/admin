import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getClientScopes() {
    let realm = store.state.local.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/client-scopes`),
        params: {},
        withCredentials: true
    })
}
async function getDefaultClientScopes() {
    let realm = store.state.local.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/default-default-client-scopes`),
        params: {},
        withCredentials: true
    })
}
async function getOptionalClientScopes() {
    let realm = store.state.local.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/default-optional-client-scopes`),
        params: {},
        withCredentials: true
    })
}
async function updateAssignedType(data) {
    let realm = store.state.local.realm;
    return await http({
        method: data.method,
        url: http.adornUrl(`/admin/realms/${realm}/default-${data.type}-client-scopes/${data.id}`),
        params: {},
        withCredentials: true
    }).then((res) => {
        return res
    }).catch((err) => {
        // 处理错误
        console.error('Error:', err);
    })
    
}


export default {
    getClientScopes,
    getDefaultClientScopes,
    getOptionalClientScopes, updateAssignedType,
}