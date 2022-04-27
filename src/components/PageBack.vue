<template>
  <div class="page-back-button" @click="gotoBack">
    <van-icon name="revoke" size="18" color="#FFF" />
  </div>
</template>

<script>
import { isInWeChatApp, getBackUrl } from "@/utils";

export default {
  name: "PageBack",
  methods: {
    gotoBack() {
      // 详情页返回固定地址
      const { name, query, params } = this.$route;
      if (name === "Detail") {
        return window.location.replace('https://haoshengyi.link/client/index.html?yuedulist=1');
      } else if(name === 'Line') {
        return window.location.replace(`https://haoshengyi.link/client/index.html?route=${query.route}&id=${params.id}`)
      }
      if (isInWeChatApp()) {
        const url = getBackUrl();
        url && window.location.replace(url);
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-back-button {
  position: absolute;
  left: 20px;
  top: 14px;
  z-index: 99;
  width: 32px;
  height: 32px;
  background: rgba(129, 106, 253, 0.7);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>