import queryString from 'query-string'
import wx from 'jweixin-npm'

export const getUrlQuery = (search = location.search) => {
    return queryString.parse(search)
}

export const wxConfig = ({ appId,timestamp,nonceStr,signature}) => {
   wx.config({
        debug: true,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ['checkJsApiList','updateTimelineShareData', 'updateAppMessageShareData','getLocation','chooseImage','downloadImage']
    });
    wx.ready((json) => {
        console.log('json',json)
    });
    wx.error((error) => {
        console.log('error', error)
    })
}

export const updateTimelineShareData = (wechatShareFriendTitle, wechatShareFriendUrl, wechatShareFriendImg) => {
    return wx.updateTimelineShareData({
        title: wechatShareFriendTitle,
        link: wechatShareFriendUrl,
        imgUrl: wechatShareFriendImg,
        success: () => {},
        cancel: () => {}
    });
}

export const updateAppMessageShareData = (wechatShareFriendTitle, wechatShareFriendConent, wechatShareFriendUrl, wechatShareFriendImg) => {
    return wx.updateAppMessageShareData({
        title: wechatShareFriendTitle,
        desc: wechatShareFriendConent,
        link: wechatShareFriendUrl,
        imgUrl: wechatShareFriendImg,
        type: 'link',
        dataUrl: '',
        success: () => {},
        cancel: () => {}
    })
}