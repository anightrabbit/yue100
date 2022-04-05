import Vue from "vue";
import {
    wxConfig
} from "@/utils"

export const getWxConfig = (href = window.location.href) => {
    // console.log(location.href.split('#')[0])
    const url = process.env.VUE_APP_API + process.env.VUE_APP_WECHAT_PATH
    return Vue.http.get(url, {
        params: {
            url:href
        }
    }).then(json => {
        const {
            appId,
            timestamp,
            nonceStr,
            signature
        } = json?.body || {};
        wxConfig({
            appId,
            timestamp,
            nonceStr,
            signature
        })
        return json.body;
    }, err => {
        console.log(err)
    })
}