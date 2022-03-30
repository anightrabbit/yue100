import Vue from "vue";
import qs from "query-string"

export const getLike = () => {
    const uid = window.localStorage.getItem('YUE100_UID');
    const code = window.localStorage.getItem('YUE100_CODE');
    if(!uid || !code) return;
    const query = {
        s: 'form',
        c: 'shoucangjilu',
        m: 'list',
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET,
        api_auth_uid: uid,
        api_auth_code: code,
    }
    const url = qs.stringifyUrl({
        url: process.env.BASE_URL + process.env.VUE_APP_API_PATH,
        query,
    })
    return Vue.http.get(url).then(json => {
        return json.body;
    }, err => {
        console.log(err)
    })
}

