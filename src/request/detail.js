import Vue from "vue";

const getDetail = (id = 50) => {
    const query = {
        s: 'ydd',
        c: 'show',
        api_call_function: 'module_show',
        id,
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET
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