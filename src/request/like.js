import Vue from "vue";

export const getLike = () => {
    const uid = window.localStorage.getItem('YUE100_UID');
    const code = window.localStorage.getItem('YUE100_CODE');
    if (!uid || !code) return;
    const query = {
        s: 'form',
        c: 'shoucangjilu',
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


export const updateLike = (id) => {
    const uid = window.localStorage.getItem('YUE100_UID');
    const code = window.localStorage.getItem('YUE100_CODE');
    if (!uid || !code) return;
    const query = {
        s: 'form',
        c: 'shoucangjilu',
        m: 'post',
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET,
        api_auth_uid: uid,
        api_auth_code: code,
    }
    const url = process.env.VUE_APP_API + process.env.VUE_APP_API_PATH

    const body = {
        "data[yuedudian][]": id
    }
    const options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        emulateJSON: true,
        params: query,
    }
    return Vue.http.post(url,body, options).then(json => {
        return json.body;
    }, err => {
        console.log(err)
    })
}