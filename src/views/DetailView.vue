<template>
  <div id="page" class="detail-page">
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
        <DetailNews :news="news" v-if="news.length" />
        <DetailMore :detail="pageData.content" />
        <DetailFooter />
      </template>
      <van-empty v-else image="error" description="网络异常">
        <van-button
          round
          type="info"
          class="refresh-button"
          @click="getPageData"
          >刷新</van-button
        >
      </van-empty>
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
import { getNews } from "@/request/news";

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
      news: [],
      loading: true,
      pageData: null,
    };
  },

  created() {
    this.getPageData();
  },
  methods: {
    async getPageData() {
      const params = this.$route.params;
      // this.$toast.loading("加载中...");
      const json = await getDetail(params?.id);
      this.loading = false;
      if (json.code === 1) {
        this.pageData = json.data;
      } else {
        this.$toast.fail(json.msg || "网络异常");
      }
      await this.getNewsData(params?.id);
    },
    async getNewsData(relid) {
      if (!relid) return false;
      const json = await getNews(relid);
      if (json.code === 1) {
        this.news = json.data;
      }
    },
  },
};
</script>

<style>
.detail-page {
  min-height: 100vh;
  padding-bottom: 100px;
}
.refresh-button {
  width: 160px;
  height: 40px;
}
</style>
