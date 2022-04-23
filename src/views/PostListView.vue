<template>
  <div id="page" class="post-list-page">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getPageData"
      >
        <PostListItem
          v-for="item in pageData"
          :key="item.id"
          :title="item.title"
          :id="item.id"
          :thumb="item.thumb"
          :author="item.zuozhe"
          :inputtime="item.inputtime"
          :touxiang="item.touxiang"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import PostListItem from "@/components/PostListItem";
import { getPost } from "@/request/post";

export default {
  name: "PostListView",
  components: {
    PostListItem,
  },
  data() {
    return {
      loading: false,
      pageData: [],
      finished: false,
      refreshing: false,
    };
  },

  methods: {
    async getPageData() {
      if (this.refreshing) {
        this.pageData = [];
        this.refreshing = false;
      }
      const json = await getPost();
      this.loading = false;
      if (json.code === 1) {
        this.pageData = json.data;
      } else {
        this.$toast.fail(json.msg || "网络异常");
      }
      // 需要分页设置
      if (this.pageData.length >= 10) {
        this.finished = true;
      }
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.getPageData();
    },
  },
};
</script>

<style>
.post-list-page {
  padding: 0 20px;
  min-height: 100vh;
  background: #fff;
}
</style>
