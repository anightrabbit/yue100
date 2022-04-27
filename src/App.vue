<template>
  <div id="app">
    <PageBack v-if="hasBack" />
    <router-view></router-view>
  </div>
</template>

<script>
import { getUrlQuery } from "@/utils";
import { getUserInfo } from "@/request/login";
import PageBack from "@/components/PageBack";

export default {
  name: "App",
  components: {
    PageBack,
  },
  computed: {
    hasBack() {
      return this.$route.name !== 'uploadImg';
    }
  },
  created() {
    const query = getUrlQuery();
    // 接入参数 api_auth_uid，api_auth_code,username,headimgurl,
    // 可能的场景1 阅读点详情 http://47.97.210.216/client/detail/10?api_auth_uid=1&api_auth_code=2
    // 可能的场景2 阅读记详情 http://47.97.210.216/client/post/10?api_auth_uid=1&api_auth_code=2
    // 可能的场景3 阅读点动态详情 http://47.97.210.216/client/news/10?api_auth_uid=1&api_auth_code=2
    if (query?.api_auth_uid && query?.api_auth_code) {
      window.sessionStorage.setItem("YUE100_UID", query?.api_auth_uid);
      window.sessionStorage.setItem("YUE100_CODE", query?.api_auth_code);
      this.getUserData();
    }
  },
  methods: {
    async getUserData() {
      const json = await getUserInfo();
      const { headimgurl, username } = json?.msg || {};
      window.sessionStorage.setItem("YUE100_USERNAME", username);
      window.sessionStorage.setItem("YUE100_HEADIMGURL", headimgurl);
    }
  },
};
</script>

<style>
html {
  -webkit-tap-highlight-color: transparent;
  height: 100%;
}
body {
  max-width: 100vw;
  margin: 0;
  color: #323233;
  font-size: 16px;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  height: 100%;
}
#app {
  box-sizing: border-box;
  min-height: 100vh;
  height: 100%;
  width: 100%;
}
p {
  margin: 0;
  padding: 0;
}
</style>