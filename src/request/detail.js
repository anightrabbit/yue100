import Vue from "vue";

const getDetail = (id = 50) => {
    const uid = window.sessionStorage.getItem('YUE100_UID');
    const code = window.sessionStorage.getItem('YUE100_CODE');
    const query = {
        
        s: 'ydd',
        c: 'show',
        api_call_function: 'module_show',
        id,
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

export default getDetail;