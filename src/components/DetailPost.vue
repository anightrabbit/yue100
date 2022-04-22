<template>
  <div class="detail-post">
    <h2 class="detail-title">
      <strong>阅读记</strong>
      <van-icon @click="gotoList" name="arrow" />
    </h2>
    <ul class="detail-post-list">
      <li
        v-for="item in post.slice(0, 3)"
        :key="item.id"
        class="detail-post-item"
        @click="gotoDetail(item.id)"
      >
        <van-image width="80px" height="80px" :src="item.thumb" fit="cover" />
        <div class="detail-post-item-content">
          <div>
            <h3 class="van-ellipsis">{{ item.title }}</h3>
            <p class="van-ellipsis" v-if="item.description">
              {{ item.description }}
            </p>
          </div>
          <div class="van-ellipsis detail-post-item-extra">
            {{ item.zuozhe }} <span v-if="item.zuozhe && item.addtime">|</span>
            {{ item.addtime }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailPost",
  props: {
    post: Array,
  },
  methods: {
    gotoDetail(id) {
      return this.$router.push({
        path: `/post/${id}`,
      });
    },
    gotoList() {
      return this.$router.push({
        path: "/post",
      });
    },
  },
};
</script>

<style>
.detail-post {
  padding: 10px 20px;
  background: #fff;
  margin-bottom: 10px;
}
.detail-title {
  color: rgba(49, 71, 128, 1);
  font-size: 18px;
  line-height: 1.2;
  margin: 0 0 10px 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-post-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  margin-bottom: 10px;
}
.detail-post-item-content {
  height: 80px;
  overflow: hidden;
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.detail-post-item-content h3 {
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  line-height: 2;
  margin: 0;
}
.detail-post-item-content p {
  color: rgba(51, 51, 51, 1);
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}
.detail-post-item-extra {
  color: rgba(102, 102, 102, 1);
  font-size: 10px;
  line-height: 1.8;
  margin: 0;
  text-align: right;
}
.detail-post-item-extra span {
  color: rgba(129, 106, 253, 1);
}
</style>