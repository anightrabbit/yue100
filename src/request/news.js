import Vue from "vue";
import qs from "query-string"

export const getNews = (id = 50) => {
    const query = {
        s: 'dongtai',
        c: 'search',
        api_call_function: 'search_by_relid',
        relid: id,
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET
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

export const getNewsDetail = (id = 50) => {
    const query = {
        s: 'dongtai',
        c: 'show',
        api_call_function: 'module_show',
        id,
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET
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
