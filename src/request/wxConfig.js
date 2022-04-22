import Vue from "vue";

export const getWxConfig = (href = window.location.href) => {
    const query = {
        s: 'httpapi',
        appid: process.env.VUE_APP_ID,
        appsecret: process.env.VUE_APP_SECRET,
        url: window?.btoa(href),
        id:1,
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