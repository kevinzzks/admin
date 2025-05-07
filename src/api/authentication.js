import http from '@/utils/request'
import store from "@/store/index.js"
// 
async function getFlows(data) {
    let realm = store.state.local.realm;
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

// 
async function getRequiredActions() {
    let realm = store.state.local.realm;
    
    return await http({
        method: "get",
        url: http.adornUrl(`/admin/realms/${realm}/ui-ext/authentication-management/required-actions`),
        params: {},
        withCredentials: true
    })
}

//
// /authentication/required-actions/TERMS_AND_CONDITIONS
async function upDataRequiredAction(data) {
    let realm = store.state.local.realm;
    
    // 移除不支持的字段
    const validData = {
        alias: data.alias,
        name: data.name,
        enabled: data.enabled,
        defaultAction: data.defaultAction,
        priority: data.priority,
        providerId: data.providerId,
        config: data.config
    };
    
    return await http({
        method: "PUT",
        url: http.adornUrl(`/admin/realms/${realm}/authentication/required-actions/${data.providerId}`),
        data: validData,
        withCredentials: true
    })
}
export default {
    getFlows,
    getRequiredActions,upDataRequiredAction
}