import Vue from "vue";

export const getPost = () => {
    const query = {
        s: 'yyj',
        c: 'search',
        api_call_function: 'module_list',
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

export const getPostDetail = (id = 50) => {
    const query = {
        s: 'yyj',
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