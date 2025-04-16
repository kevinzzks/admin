import http from '@/utils/request'
import store from "@/store/index.js"
// 
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
async function getRealm() {
    let realm = store.state.login.realm;
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}`),
        params: {},
        withCredentials: true
    })
}
async function setRealm(data) {
    let realm = store.state.login.realm;
    return await http({
        method: "put",
        url: http.adornUrl(`/admin/realms/${realm}`),
        params: data,
        withCredentials: true
    })
}
export default {
    getRealmList,getRealm,setRealm
} 