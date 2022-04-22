<template>
  <div id="page" class="post-page">
    <van-skeleton title :row="3" :loading="loading">
      <template v-if="pageData">
        <div class="post-page-header">
          <van-image :src="pageData.touxiang" width="40" height="40" class="post-author-img" round fit="cover" />
          <div class="post-page-header-content">
            <h3>{{ pageData.author }}</h3>
            <p>{{ pageData.inputtime }}</p>
          </div>
        </div>
        <van-image width="100%" :src="pageData.thumb" />
        <h1 class="post-page-title">{{ pageData.title }}</h1>
        <p class="post-page-description" v-if="pageData.description">{{pageData.description}}</p>
        <div v-html="pageData.content" class="post-page-content"></div>
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

import { getPostDetail } from "@/request/post";

export default {
  name: "PostView",
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
      const json = await getPostDetail(params?.id);
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
.post-page {
  background: #fff;
  min-height: calc(100vh - 100px);
  padding-bottom: 100px;
  box-sizing: border-box;
}
.post-page-header {
  display: flex;
  padding: 10px 20px;
  box-sizing: border-box;
}
.post-page-title {
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  line-height: 2;
  margin: 20px 20px 0 20px;
}
.post-page-description {
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  line-height: 2;
  margin: 0 20px;
}
.post-page-header-content {
  display: flex;
  flex: 1;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.post-page-header-content h3 {
  margin: 0;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  line-height: 1.5;
}
.post-page-header-content p {
  color: rgba(102, 102, 102, 1);
  font-size: 10px;
  line-height: 1.5;
}
.post-page-content {
  padding: 20px;
}
.post-page-content img {
  max-width: 100%;
}
.post-author-img {
  border:1px solid #ddd;
}
</style>
