<template>
  <div class="detail-wechat">
    <van-cell center label="微信公众号">
      <template #title>
        <span class="detail-wechat-title">虹口区图书馆乍浦分馆</span>
      </template>
      <template #icon>
        <van-image
          width="30"
          height="30"
          :src="require('../assets/wx.svg')"
          style="margin-right: 10px"
        />
      </template>
      <template #extra>
        <button class="detail-wechat-button" @click="showPopup">关注</button>
      </template>
    </van-cell>
    <van-popup v-model="show" style="background: transparent; width: 64%">
      <div class="detail-wechat-popup">
        <h3 class="van-ellipsis">虹口区图书馆乍浦分馆</h3>
        <p>保存图片后用微信扫码关注</p>
        <van-image width="144" height="144" src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      </div>
      <van-button
        round
        plain
        type="primary"
        color="rgba(255, 255, 255, 1)"
        style="background: transparent; margin: 0 auto; display: block"
        >保存至相册</van-button
      >
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "DetailWeChat",
  props: {
    url: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style>
.detail-wechat {
  margin-bottom: 10px;
}
.detail-wechat-title {
  color: rgba(49, 71, 128, 1);
  font-size: 14px;
  font-weight: 700;
}
.detail-wechat-button {
  padding: 0;
  margin: 0;
  width: 64px;
  height: 22px;
  line-height: 22px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(40, 196, 69, 1);
  border-radius: 30px;
  color: rgba(40, 196, 69, 1);
  font-size: 12px;
}
.detail-wechat-popup {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.detail-wechat-popup h3 {
  color: rgba(49, 71, 128, 1);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
}
.detail-wechat-popup p {
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  line-height: 1.5;
  margin: 0 0 20px 0;
}
</style>