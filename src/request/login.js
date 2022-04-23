import Vue from "vue";

export const login = () => {
    const query = {
        s: 'weixin',
        c: 'go',
    }
    const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH
    return Vue.http.get(url, {
        params: query
    }).then(json => {
        return json.body;
    }, err => {
        console.log(err)
    })
}

export const getUserInfo = () => {
    const uid = window.sessionStorage.getItem('YUE100_UID');
    const code = window.sessionStorage.getItem('YUE100_CODE');
    const query = {
        s: 'weixin',
        c: 'go',
        m: 'getuser',
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET,
        api_auth_uid: uid,
        api_auth_code: code,
    }
    const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH
    return Vue.http.get(url, {
        params: query
    }).then(json => {
        return json.body;
    }, err => {
        console.log(err)
    })
}