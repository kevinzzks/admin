import http from '@/utils/request'
import store from "@/store/index.js"
let realm = store.state.login.realm;
// 查询roles角色
async function getRealmRoles(data) {
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
// 查询roles角色
async function createRealmRoles(data) {
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
    return await http({
        method: "DELETE",
        url: http.adornUrl(`/admin/realms/${realm}/roles-by-id/${data.key}`),
        data: {},
        withCredentials: true
    })
}
export default {
    getRealmRoles,createRealmRoles,deleteRealmRoles
} 