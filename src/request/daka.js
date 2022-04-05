import Vue from "vue";

export const getDaka = () => {
    const uid = window.localStorage.getItem('YUE100_UID');
    const code = window.localStorage.getItem('YUE100_CODE');
    if (!uid || !code) return '未登录';
    const query = {
        s: 'form',
        c: 'dakajilu',
        m: 'list',
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

export const refreshDaka = ({
    id,
    lng,
    lat
}) => {
    const uid = window.localStorage.getItem('YUE100_UID');
    const code = window.localStorage.getItem('YUE100_CODE');
    if (!uid || !code) return '未登录';
    const query = {
        s: 'form',
        c: 'dakajilu',
        m: 'post',
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET,
        api_auth_uid: uid,
        api_auth_code: code,
    }
    const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH

    const body = {
        "data[yuedudian][]": id,
        "data[lng]": lng,
        "data[lat]": lat
    }
    const options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        emulateJSON: true,
        params: query,
    }
    return Vue.http.post(url, body, options).then(json => {
        return json.body;
    }, err => {
        console.log(err)
    })
}