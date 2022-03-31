<template>
  <div class="detail-footer">
    <van-grid :border="false" :column-num="getColumnNum">
      <van-grid-item v-if="needShare">
        <van-button
          round
          :plain="getShareButtunStyle"
          type="primary"
          color="rgba(129, 106, 253, 1)"
          block
          @click="showShare"
          >分享</van-button
        >
      </van-grid-item>
      <van-grid-item v-if="needDaka">
        <van-button
          round
          type="primary"
          color="rgba(129, 106, 253, 1)"
          block
          @click="daka"
          >我要打卡</van-button
        >
      </van-grid-item>
    </van-grid>
    <PopupShare v-on:toggle-popup="toggleShare" v-if="show" />
  </div>
</template>

<script>
import PopupShare from "./PopupShare.vue";

export default {
  name: "DetailFooter",
  components: {
    PopupShare,
  },
  props: {
    needShare: Boolean,
    needDaka: Boolean,
    dakaAction: Function,
  },
  computed: {
    getColumnNum() {
      return this.needShare + this.needDaka;
    },
    getShareButtunStyle() {
      if (this.needShare && !this.needDaka) {
        return false;
      }
      return true;
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showShare() {
      this.show = true;
    },
    toggleShare() {
      this.show = false;
    },
    daka() {
      this.$toast.loading({
        message: "打卡中...",
        forbidClick: true,
      });
      if (navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(
          (json) => {
            const pos = json.coords;
            console.log("Latitude : " + pos.latitude);
            console.log("Longitude: " + pos.longitude);
            this.dakaAction(pos.longitude,pos.latitude);
          },
          (error) => {
            this.$toast.fail(error?.message || "定位失败");
          },
          {
            enableHighAccuracy: true,
            timeout: 5000, // 5s超时设置
            maximumAge: 0,
          }
        );
      } else {
        this.$toast.fail("当前浏览器不支持该功能");
      }
    },
  },
};
</script>

<style>
.detail-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  border-top: 1px solid #efefef;
  background: #fff;
  overflow: hidden;
}
</style>