import http from '@/utils/request'
//密码登录
async function checkPLogin(data) {
   
   console.log(1);
   

    if (data.username == 'admin' && data.password == '0') {
        console.log(2);
        return Promise.resolve({
            data: {
                code: 200,
                msg: '成功',
                data: {
                    token: 'admin'
                }
            }
        })
    } else {
        console.log(3);
        return Promise.resolve({
            data: {
                code: 400,
                msg: '失败',
                data: null
            }
        })
    }

    // return await http({
    //     method: "POST",
    //     url: http.adornUrl(`/realms/master/login-actions/authenticate`),
    //     data: http.adornData(pushDate),
    //     withCredentials: true
    // })
}





// checkPassRetset 设置密码 用户重置密码
async function authenticate (data) {
    // 使用 URLSearchParams 对象
    const params = new URLSearchParams();
    params.append('password', data.password);
    params.append('oldPassword', data.currentPassword);
    params.append('realm', data.realm);
    // params.append('et', 1);
    params.append('et', data.et);
    params.append('lpsust', data.lpsust);
    params.append('sign', data.sign);
    params.append('brand', data.brand);
    return await http.post(http.adornUrl(`/realms/master/login-actions/authenticate`), params.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export default {
    checkPLogin,authenticate, 
} 