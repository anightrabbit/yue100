<template>
  <div class="detail-footer">
    <van-grid :border="false" :column-num="2">
      <van-grid-item>
        <van-button
          round
          plain
          type="primary"
          color="rgba(129, 106, 253, 1)"
          block
          @click="showShare"
          >分享</van-button
        >
      </van-grid-item>
      <van-grid-item>
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
}
</style>