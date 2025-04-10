import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getRealmList() {
    
let realm = store.state.login.realm;
    let pushDate = {
        "first": 0,
        "max": 11,
        "search": '',
    }
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/ui-ext/realms/names`),
        params: pushDate,
        withCredentials: true
    })
}

export default {
    getRealmList,
} 