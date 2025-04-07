import http from '@/utils/request'
import store from "@/store/index.js"
// 查询roles角色
async function getRealmList() {
    
let realm = store.state.login.realm;
    // let pushDate = {
    //     "first": data.first,
    //     "max": data.max,
    //     "search": data.search,
    // }
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/ui-ext/realms/names?first=0&max=11&search=`),
        params: {},
        withCredentials: true
    })
}

export default {
    getRealmList,
} 