<template>
  <div class="post-list-item" @click="gotoDetail(id)">
    <div class="post-page-header">
      <van-image
        :src="touxiang"
        width="40"
        height="40"
        round
        fit="cover"
        class="post-author-img"
      />
      <div class="post-page-header-content">
        <h3>{{ author || '匿名' }}</h3>
        <p>{{ inputtime }}</p>
      </div>
    </div>
    <van-image width="100%" height="180" :src="thumb" class="post-list-item-img" fit="cover" />
    <h3 class="van-ellipsis post-list-item-title">{{ title }}</h3>
    <p class="van-ellipsis post-list-item-desc" v-if="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "PostListItem",
  props: {
    id: [String, Number],
    title: String,
    description: String,
    thumb: String,
    inputtime: String,
    author: String,
    touxiang: String,
  },
  methods: {
    gotoDetail(id) {
      return this.$router.push({
        path: `/post/${id}`,
      });
    },
  },
};
</script>

<style>
.post-list-item {
  margin: 15px;
  border-bottom: 1px solid #dfdfdf;
}
.post-list-item-title {
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  line-height: 2;
}
.post-list-item-desc {
  line-height: 2;
  color: rgba(128, 128, 128, 1);
  font-size: 12px;
}
.post-list-item-img {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(10, 10, 10, 0.1);
}
</style>