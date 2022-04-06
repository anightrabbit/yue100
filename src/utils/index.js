import queryString from 'query-string'
import wx from 'jweixin-npm'

export const getUrlQuery = (search = location.search) => {
    return queryString.parse(search)
}

export const isInWeChatApp = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false;
};

export const wxConfig = ({
    appId,
    timestamp,
    nonceStr,
    signature
}) => {
    wx.config({
        debug: false,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'getLocation', 'chooseImage', 'downloadImage']
    });
    wx.ready(() => {
        updateTimelineShareData('悦读100', location.href.split('?')[0], 'https://haoshengyi.link/uploadfile/202203/e7e7fb009014db8.png');
        updateAppMessageShareData('悦读100','悦读1000', location.href.split('?')[0], 'https://haoshengyi.link/uploadfile/202203/e7e7fb009014db8.png');
    });
}

export const updateTimelineShareData = (wechatShareFriendTitle, wechatShareFriendUrl, wechatShareFriendImg) => {
    wx.updateTimelineShareData({
        title: wechatShareFriendTitle,
        link: wechatShareFriendUrl,
        imgUrl: wechatShareFriendImg,
        success: () => {},
        cancel: () => {}
    });
}

export const updateAppMessageShareData = (wechatShareFriendTitle, wechatShareFriendConent, wechatShareFriendUrl, wechatShareFriendImg) => {
    wx.updateAppMessageShareData({
        title: wechatShareFriendTitle,
        desc: wechatShareFriendConent,
        link: wechatShareFriendUrl,
        imgUrl: wechatShareFriendImg,
        success: () => {},
        cancel: () => {}
    })
}

export const getLocation = (successCallback, failCallback) => {
    return wx.getLocation({
        type: 'wgs84',
        success: (res) => {
            successCallback && successCallback(res);
        },
        cancel: () => {
            failCallback && failCallback()
        }
    })
}