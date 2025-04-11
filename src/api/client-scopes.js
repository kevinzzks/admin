import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getClientScopes() {
    let realm = store.state.login.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/client-scopes`),
        params: {},
        withCredentials: true
    })
}
async function getDefaultClientScopes() {
    let realm = store.state.login.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/default-default-client-scopes`),
        params: {},
        withCredentials: true
    })
}
async function getOptionalClientScopes() {
    let realm = store.state.login.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/default-optional-client-scopes`),
        params: {},
        withCredentials: true
    })
}
export default {                    
    getClientScopes,
    getDefaultClientScopes,
    getOptionalClientScopes,
}