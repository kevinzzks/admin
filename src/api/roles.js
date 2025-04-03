import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getRealmRoles(data) {
    let realm = store.state.login.realm;
    let pushDate = {
        "first": data.first,
        "max": data.max,
        "search": data.search,
    }
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/roles`),
        params: pushDate,
        withCredentials: true
    })
}
// 创建roles角色
async function createRealmRoles(data) {
    let realm = store.state.login.realm;
    let pushDate = {
        attributes: {},
        name: data.name,
        description: data.desc,
    }
    return await http({
        method: "post",
        url: http.adornUrl(`/admin/realms/${realm}/roles`),
        data: http.adornData(pushDate),
        withCredentials: true
    })
}
// 删除roles角色
async function deleteRealmRoles(data) {
    let realm = store.state.login.realm;
    return await http({
        method: "DELETE",
        url: http.adornUrl(`/admin/realms/${realm}/roles-by-id/${data.key}`),
        data: {},
        withCredentials: true
    })
}
// 获取单个roles角色 /roles-by-id/67e4c006-25e9-4074-b685-9899a566d7ee
async function getRealmRole(data) {
    let realm = store.state.login.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/roles-by-id/${data.key}`),
        data: {},
        withCredentials: true
    })
}
export default {
    getRealmRoles,createRealmRoles,deleteRealmRoles,getRealmRole
} 