<template>
  <div id="page" class="news-page">
    <van-skeleton title :row="3" :loading="loading">
      <template v-if="pageData">
        <div class="news-page-header">
          <p>发布来源：{{ pageData.laiyuan || "未知" }}</p>
          <p>发布时间：{{ pageData.inputtime }}</p>
          <h1>{{ pageData.title }}</h1>
        </div>
        <div v-html="pageData.content" class="news-page-content"></div>
        <DetailFooter needShare />
      </template>
      <van-empty v-else image="error" description="网络异常">
        <van-button
          round
          type="primary"
          color="rgba(129, 106, 253, 1)"
          class="refresh-button"
          @click="getPageData"
          >刷新</van-button
        >
      </van-empty>
    </van-skeleton>
  </div>
</template>

<script>
import DetailFooter from "@/components/DetailFooter";

import { getNewsDetail } from "@/request/news";

export default {
  name: "NewsView",
  components: {
    DetailFooter,
  },
  data() {
    return {
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
      const json = await getNewsDetail(params?.id);
      this.loading = false;
      if (json.code === 1) {
        this.pageData = json.data;
      } else {
        this.$toast.fail(json.msg || "网络异常");
      }
    },
  },
};
</script>

<style>
.news-page {
  padding: 20px;
  background: #fff;
  min-height: calc(100vh - 100px);
  padding-bottom: 100px;
  box-sizing: border-box;
}
.news-page-header p {
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
  line-height: 20px;
  margin: 0;
}
.news-page-header h1 {
  line-height: 28px;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  margin: 10px 0;
}
.news-page-content p {
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  line-height: 20px;
  text-indent: 2em;
  margin-bottom: 10px;
}
.news-page-content img {
  max-width: 100%;
  margin: 0 auto;
}
</style>
