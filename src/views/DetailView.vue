<template>
  <div id="page" class="detail-page">
    <van-skeleton title avatar :row="3" :loading="loading">
      <template v-if="pageData">
        <DetailHeader :src="pageData.thumb" />
        <DetailInfor
          :title="pageData.title"
          :yysj="pageData.yysj"
          :imgs="pageData.images"
          :address="pageData.address"
          :dakarenqi="pageData.dakarenqi"
          :scrq="pageData.scrq"
          :zdyrq="pageData.zdyrq"
          :id="pageData.id"
          :lxfs="pageData.lxfs"
          v-on:like-action="getPageData"
        />
        <DetailWeChat :url="pageData.offiaccount" :title="pageData.title" v-if="pageData.offiaccount" />
        <DetailNews :news="news" v-if="news.length" />
        <DetailMore :detail="pageData.content" v-if="pageData.content" />
        <DetailPost :post="post" v-if="post.length" />
        <DetailFooter needShare :needDaka="pageData.shifoukedaka == '是'" :id="pageData.id" :isDaka="!!pageData.isdaka" v-on:daka-action="getPageData" />
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
import { aboutPost } from "@/request/post";
import { getDaka } from "@/request/daka";

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
      isDaka: false,
      loading: true,
      pageData: null,
    };
  },

  created() {
    // 查询详情
    this.getPageData();
    // 查询关联动态
    this.getNewsData();
    // 查询关联阅读记
    this.getPostData();
    // 查询打卡记录
    this.getDakaData();
  },
  methods: {
    async getPageData() {
      const params = this.$route.params;
      const json = await getDetail(params?.id);
      this.loading = false;
      if (json.code === 1) {
        this.pageData = json.data;
      } else {
        this.$toast.fail(json.msg || "网络异常");
      }

    },
    async getNewsData() {
      const params = this.$route.params;
      const relid = params?.id;
      if (!relid) return false;
      const json = await getNews(relid);
      if (json.code === 1) {
        this.news = json.data;
      }
    },
    async getPostData() {
      const params = this.$route.params;
      const relid = params?.id;
      if (!relid) return false;
      const json = await aboutPost(relid);
      if (json.code === 1) {
        this.post = json.data;
      }
    },
    async getDakaData() {
      const json = await getDaka();
      if (json?.code === 1) {
        const allDaka = json.data;
        const ifDaka = allDaka.find((item) => item.id === this.id);
        if (ifDaka) this.isDaka = true;
      }
    },
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
