<template>
  <div id="page">
    <van-skeleton title avatar :row="3" :loading="loading">
      <template v-if="pageData">
        <DetailHeader :src="pageData.thumb" />
        <DetailInfor
          :title="pageData.title"
          subTitle="营业时间"
          :imgs="pageData.images"
          :address="pageData.address"
          :dakarenqi="pageData.dakarenqi"
          :scrq="pageData.scrq"
          :zdyrq="pageData.zdyrq"
        />
        <DetailWeChat />
        <DetailNews :news="news" />
        <DetailMore :detail="pageData.content" />
        <DetailFooter />
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import DetailHeader from "@/components/DetailHeader";
import DetailInfor from "@/components/DetailInfor";
import DetailNews from "@/components/DetailNews";
import DetailMore from "@/components/DetailMore";
import DetailWeChat from "@/components/DetailWeChat";
import DetailFooter from "@/components/DetailFooter";

import getDetail from "@/request/detail";
// import { getUrlQuery } from "@/utils";

export default {
  name: "DetailView",
  components: {
    DetailHeader,
    DetailInfor,
    DetailNews,
    DetailMore,
    DetailWeChat,
    DetailFooter,
  },
  data() {
    return {
      news: [
        {
          id: 123,
          title: "疫情之势，核久必封，封久必核,疫情之势，核久必封，封久必核",
          date: "2022/02/02",
        },
        {
          id: 123,
          title: "我和你共筑地球村",
          date: "2022/02/03",
        },
        {
          id: 123,
          title: "冷风吹着她，我要跟她回家",
          date: "2022/02/04",
        },
      ],
      loading: true,
      pageData: null,
    };
  },

  created() {
    const params = this.$route.params
    // const urlQuery = getUrlQuery();
    this.getPageData(params?.id);
  },
  methods: {
    async getPageData(id) {
      this.$toast.loading("加载中...");
      const json = await getDetail(id);
      if (json.code === 1) {
        this.pageData = json.data;
        this.loading = false;
      } else {
        this.$toast.fail("请求失败");
      }
    },
  },
};
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
}
#app {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100px;
}
</style>
