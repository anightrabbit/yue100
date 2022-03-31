<template>
  <div id="page" class="detail-page">
    <van-skeleton title avatar :row="3" :loading="loading">
      <template v-if="pageData">
        <DetailHeader :src="pageData.thumb" />
        <DetailInfor
          :title="pageData.title"
          :description="pageData.description"
          :imgs="pageData.images"
          :address="pageData.address"
          :dakarenqi="pageData.dakarenqi"
          :scrq="pageData.scrq"
          :zdyrq="pageData.zdyrq"
          :id="pageData.id"
          :lxfs="pageData.lxfs"
          @dakaAction="dakaAction"
        />
        <DetailWeChat :url="pageData.offiaccount" :title="pageData.title" />
        <DetailNews :news="news" v-if="news.length" />
        <DetailMore :detail="pageData.content" />
        <DetailPost :post="post" v-if="post.length" />
        <DetailFooter needShare needDaka />
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
import DetailHeader from "@/components/DetailHeader";
import DetailInfor from "@/components/DetailInfor";
import DetailNews from "@/components/DetailNews";
import DetailMore from "@/components/DetailMore";
import DetailWeChat from "@/components/DetailWeChat";
import DetailFooter from "@/components/DetailFooter";
import DetailPost from "@/components/DetailPost";
import getDetail from "@/request/detail";
import { getNews } from "@/request/news";
import { getPost } from "@/request/post";
import { refreshDaka } from "@/request/daka";

export default {
  name: "DetailView",
  components: {
    DetailHeader,
    DetailInfor,
    DetailNews,
    DetailMore,
    DetailWeChat,
    DetailFooter,
    DetailPost,
  },
  data() {
    return {
      news: [],
      post: [],
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
      await this.getPostData();
    },
    async getNewsData(relid) {
      if (!relid) return false;
      const json = await getNews(relid);
      if (json.code === 1) {
        this.news = json.data;
      }
    },
    async getPostData() {
      const json = await getPost();
      if (json.code === 1) {
        this.post = json.data;
      }
    },
    async dakaAction (lng,lat) {
      if(!this.pageData?.id) return
      const json = await refreshDaka({
        lng,
        lat,
        id: this.pageData?.id
      });
      if (json.code === 1) {
        this.$toast.success("打卡成功")
      }
    }
  },
};
</script>

<style>
.detail-page {
  min-height: calc(100vh - 100px);
  padding-bottom: 100px;
}
.refresh-button {
  width: 160px;
  height: 40px;
}
</style>
