<template>
  <van-popup v-model="show" style="background: transparent" @close="closePopup" safe-area-inset-bottom>
    <van-image width="270" height="388" :src="url" class="popup-daka-image" />
    <div class="popup-daka-buttons">
      <van-button
        round
        plain
        type="primary"
        color="rgba(255, 255, 255, 1)"
        style="background: transparent; margin: 0 auto; display: block"
        >查看所有明信片</van-button
      >
      <van-button
        round
        plain
        type="primary"
        color="rgba(255, 255, 255, 1)"
        style="background: transparent; margin: 0 auto; display: block"
        >保存至相册</van-button
      >
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "PopupDaka",
  props: {
    url: String,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    closePopup() {
      this.$emit("toggle-popup");
    },
  },
};
</script>

<style>
.popup-daka-image {
  border-radius: 12px;
  width: 270px;
  height: 388px;
  overflow: hidden;
  margin-bottom: 25px;
}
.popup-daka-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>