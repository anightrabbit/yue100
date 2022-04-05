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
          @click="setShare"
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
    <PopupShare v-on:toggle-popup="toggleShare" v-if="showShare" />
    <PopupDaka v-on:toggle-popup="toggleDaka" :url="url" v-if="showDaka" />
  </div>
</template>

<script>
import { refreshDaka } from "@/request/daka";
import { getWxConfig } from "@/request/wxConfig";
import { wxConfig,isInWeChatApp } from "@/utils";
import PopupShare from "./PopupShare.vue";
import PopupDaka from "./PopupDaka.vue";

export default {
  name: "DetailFooter",
  components: {
    PopupShare,
    PopupDaka,
  },
  props: {
    needShare: Boolean,
    needDaka: Boolean,
    id: [String, Number],
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
      showShare: false,
      showDaka: false,
      url: "",
    };
  },
  created() {
    this.initWxConfig()
  },
  methods: {
    setShare() {
      this.showShare = true;
    },
    toggleShare() {
      this.showShare = false;
    },
    setDaka() {
      this.showDaka = true;
    },
    toggleDaka() {
      this.showDaka = false;
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
            this.dakaAction({
              lng: pos.longitude,
              lat: pos.latitude,
              id: this.id,
            });
          },
          (error) => {
            this.$toast.fail(error?.message || "定位失败");
            this.$emit("daka-action", 1, 2);
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
    async dakaAction({ lng, lat, id }) {
      console.log(lng, lat);
      if (!this.id) return;
      const json = await refreshDaka({
        lng,
        lat,
        id,
      });
      if (json.code === 1) {
        this.url = json?.url;
        // this.$toast.success("打卡成功");
        this.setDaka();
        await this.$emit("daka-action");
      } else {
        this.$toast.fail(json?.msg || "打卡失败");
      }
    },
    async initWxConfig() {
      if(!isInWeChatApp) return;
      const json = await getWxConfig();
      if (json?.code === 1) {
        wxConfig(json.data)
      }
    }
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