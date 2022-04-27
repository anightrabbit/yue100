import queryString from "query-string";
import wx from "jweixin-npm";

export const getUrlQuery = (search = location.search) => {
  return queryString.parse(search);
};

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
    jsApiList: [
      "updateTimelineShareData",
      "updateAppMessageShareData",
      "getLocation",
      "chooseImage",
      "downloadImage",
    ],
  });
};

export const updateTimelineShareData = (
  wechatShareFriendTitle,
  wechatShareFriendUrl,
  wechatShareFriendImg
) => {
  return wx.ready(() => {
    wx.updateTimelineShareData({
      title: wechatShareFriendTitle,
      link: wechatShareFriendUrl,
      imgUrl: wechatShareFriendImg,
      success: () => {},
      cancel: () => {},
    });
  });
};

export const updateAppMessageShareData = (
  wechatShareFriendTitle,
  wechatShareFriendConent,
  wechatShareFriendUrl,
  wechatShareFriendImg
) => {
  return wx.updateAppMessageShareData({
    title: wechatShareFriendTitle,
    desc: wechatShareFriendConent,
    link: wechatShareFriendUrl,
    imgUrl: wechatShareFriendImg,
    success: () => {},
    cancel: () => {},
  });
};

export const getLocation = (successCallback, failCallback) => {
  return wx.getLocation({
    type: "wgs84",
    success: (res) => {
      successCallback && successCallback(res);
    },
    cancel: () => {
      failCallback && failCallback();
    },
  });
};

export const checkJsApiOne = (apiName) => {
  return new Promise((resolve, reject) => {
    wx.checkJsApi({
      jsApiList: [apiName], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        if (res.checkResult[apiName]) {
          resolve(true);
        }
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
};

export const chooseImage = () => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        const localId = res.localIds[0];
        checkJsApiOne("getLocalImgData")
          .then((support) => {
            //兼容ios 无法展示图片的情况
            if (support) {
              wx.getLocalImgData({
                localId: localId,
                success: function (getLocalImgDataRes) {
                  const {
                    localData,
                    ...rest
                  } = getLocalImgDataRes;
                  console.log(rest);
                  resolve(localData);
                },
                fail: function (err) {
                  reject(err);
                },
              });
            } else {
              reject("getLocalImgData not support");
            }
          })
          .catch(() => {
            resolve(localId);
          });
      },
      fail: function (err) {
        reject({
          catchType: "fail",
          catchRes: err
        });
      },
      cancel: function (res) {
        reject({
          catchType: "cancel",
          catchRes: res
        });
      },
    });
  });
};


export const setBackUrl = (url = window.location.href) => {
  const urls = window.sessionStorage.getItem('YUE100_ROUTE');
  const urls_array = JSON.parse(urls) || [];
  console.log('url_array', urls_array)
  if (urls_array[urls_array.length - 1] === url) return;
  urls_array.push(url);
  window.sessionStorage.setItem('YUE100_ROUTE', JSON.stringify(urls_array));
}

export const getBackUrl = () => {
  const urls = window.sessionStorage.getItem('YUE100_ROUTE');
  const urls_array = JSON.parse(urls) || [];
  const back_url = urls_array.pop();
  window.sessionStorage.setItem('YUE100_ROUTE', JSON.stringify(urls_array));
  return back_url;
}