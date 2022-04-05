<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getUrlQuery } from "@/utils"
import { getWxConfig} from "@/request/wxConfig"

export default {
  name: "App",
  async created() {
    const query = getUrlQuery();
    // 接入参数 api_auth_uid，api_auth_code
    // 可能的场景1 阅读点详情 http://47.97.210.216/client/detail/10?api_auth_uid=1&api_auth_code=2
    // 可能的场景2 阅读记详情 http://47.97.210.216/client/post/10?api_auth_uid=1&api_auth_code=2
    // 可能的场景3 阅读点动态详情 http://47.97.210.216/client/news/10?api_auth_uid=1&api_auth_code=2
    if(query?.api_auth_uid) {
      window.localStorage.setItem('YUE100_UID',query?.api_auth_uid)
    }
    if(query?.api_auth_code) {
      window.localStorage.setItem('YUE100_CODE', query?.api_auth_code)
    }
    await getWxConfig()
  },
}
</script>

<style>
html {
  -webkit-tap-highlight-color: transparent;
}
body {
  max-width: 100vw;
  margin: 0;
  color: #323233;
  font-size: 16px;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
#app {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
p {
  margin: 0;
  padding: 0;
}
</style>
