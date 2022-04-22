<template>
  <van-popup v-model="show" round closeable safe-area-inset-bottom>
    <div class="popup-login">
      <h3 class="popup-login-title">请登录后，再操作</h3>
      <van-button
        round
        type="info"
        color="rgba(129, 106, 253, 1)"
        @click="onLogin"
        >立即登录</van-button
      >
    </div>
  </van-popup>
</template>

<script>
// import { login } from "@/request/login";

export default {
  name: "PopupLogin",
  data() {
    return {
      show: true,
    };
  },
  methods: {
    closePopup() {
      this.$emit("toggle-popup");
    },
    async onLogin() {
      return (location.href =
        "https://haoshengyi.link/index.php?s=weixin&c=go");
      // const json = await login();
      // if (json?.code === 1) {
      //   console.log(json.data);
      //   const { id, api_auth_code, headimgurl, mingyan, zuozhe, bgimage } =
      //     json?.data || {};
      //   window.localStorage.setItem("YUE100_UID", id);
      //   window.localStorage.setItem("YUE100_CODE", api_auth_code);
      //   window.localStorage.setItem("YUE100_HEADIMG", headimgurl);
      //   window.localStorage.setItem("YUE100_MINGYAN", mingyan);
      //   window.localStorage.setItem("YUE100_ZUOZHE", zuozhe);
      //   window.localStorage.setItem("YUE100_BGIMAGE", bgimage);
      //   this.closePopup();
      // } else {
      //   this.$toast.fail(json?.msg || "登录失败");
      // }
    },
  },
};
</script>

<style>
.popup-login {
  width: 80vw;
  text-align: center;
  padding-bottom: 20px;
}
.popup-login-title {
  color: rgba(49, 71, 128, 1);
  font-size: 18px;
}
</style>