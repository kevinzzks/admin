import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getClients(data) {
    let realm = store.state.login.realm;
    let pushDate = {
        "first": data.first,
        "max": data.max,
        "search": data.search,
    }
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/clients`),
        params: pushDate,
        withCredentials: true
    })
}
// 创建roles角色
async function createClients(data) {
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
async function deleteClients(data) {
    let realm = store.state.login.realm;
    return await http({
        method: "DELETE",
        url: http.adornUrl(`/admin/realms/${realm}/roles-by-id/${data.id}`),
        data: {},
        withCredentials: true
    })
}
// 获取单个roles角色 /roles-by-id/67e4c006-25e9-4074-b685-9899a566d7ee
async function getclient(data,type) {
    let realm = store.state.login.realm;
    let str = "";
    if(type == "id"){
       str = http.adornUrl(`/admin/realms/${realm}/roles-by-id/${data.id}`);
    }else if(type == "name"){
       str = http.adornUrl(`/admin/realms/${realm}/roles/${data.name}`);
    }
    
    return await http({
        method: "get",
        url: str,
        data: {},
        withCredentials: true
    })
}
// updateclient admin/realms/master/roles/ff
async function updateclient(data) {
    let realm = store.state.login.realm;
    let str = http.adornUrl(`/admin/realms/${realm}/roles-by-id/${data.id}`)
    return await http({
        method: "put",
        url: str,
        data: data,
        withCredentials: true
    })
}
export default {
    getClients,createClients,deleteClients,getclient,updateclient
} 