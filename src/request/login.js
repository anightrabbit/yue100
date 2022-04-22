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