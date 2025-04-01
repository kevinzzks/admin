import http from '@/utils/request'
// 查询realm角色
async function getRealmRoles() {
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/master/roles?first=0&max=11`),
        // params: pushDate,
        withCredentials: true
    })
}

export default {
    getRealmRoles
} 