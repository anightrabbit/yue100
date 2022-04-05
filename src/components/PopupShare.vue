<template>
  <van-popup
    v-model="show"
    round
    closeable
    @close="closePopup"
    close-icon="close"
    position="bottom"
    safe-area-inset-bottom
  >
    <h3 class="popup-share-title">分享到</h3>
    <van-grid clickable :column-num="2" :border="false">
      <van-grid-item @click="updateAppMessageShareDataFn">
        <van-image width="60" height="60" :src="require('../assets/wx.svg')" />
        <span class="popup-share-text">微信好友</span>
      </van-grid-item>
      <van-grid-item @click="updateTimelineShareDataFn">
        <van-image width="60" height="60" :src="require('../assets/pyq.svg')" />
        <span class="popup-share-text">朋友圈</span>
      </van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
import {
  updateAppMessageShareData,
  updateTimelineShareData,
} from "@/utils";

export default {
  name: "PopupShare",
  data() {
    return {
      show: true,
    };
  },
  methods: {
    closePopup() {
      this.$emit("toggle-popup");
    },
    updateAppMessageShareDataFn() {
      updateAppMessageShareData('悦读100','悦读1000', location.href.split('#')[0], 'https://haoshengyi.link/uploadfile/202203/e7e7fb009014db8.png')
    },
    updateTimelineShareDataFn() {
      updateTimelineShareData('悦读100', location.href.split('#')[0], 'https://haoshengyi.link/uploadfile/202203/e7e7fb009014db8.png')
    }
  },
};
</script>

<style>
.popup-share-title {
  color: rgba(49, 71, 128, 1);
  font-size: 18px;
  margin: 16px 16px 10px 16px;
}
.popup-share-text {
  color: rgba(51, 51, 51, 1);
  font-size: 12px;
  line-height: 18px;
  margin-top: 5px;
}
</style>