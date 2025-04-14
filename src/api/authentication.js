import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getFlows(data) {
    let realm = store.state.login.realm;
    let pushDate = {
        "first": data.first,
        "max": data.max,
    }
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/ui-ext/authentication-management/flows`),
        params: pushDate,
        withCredentials: true
    })
}

// 查询roles角色
async function getRequiredActions() {
    let realm = store.state.login.realm;
    
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/ui-ext/authentication-management/required-actions`),
        params: {},
        withCredentials: true
    })
}
export default {
    getFlows,
    getRequiredActions,
}