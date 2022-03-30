<template>
  <div class="detail-infor">
    <!-- <van-cell :title="title" value="" :label="subTitle" /> -->
    <h1 class="detail-infor-title van-ellipsis">{{ title }}</h1>
    <p class="detail-infor-desc van-multi-ellipsis--l3">{{ description }}</p>
    <!-- 收藏/取消收藏 -->
    <div class="detail-like" @click="refreshLike">
      <van-image
        width="14"
        height="14"
        :src="require(`../assets/${getLikeImg}.svg`)"
        style="margin-right: 5px"
      />
      <span class="detail-like-text">{{ love ? "已" : "" }}收藏</span>
    </div>
    <!-- 相册 -->
    <DetailGallery :imgs="imgs" v-if="imgs.length" />
    <!-- 地址/电话 -->
    <div class="detail-infor-text">
      <div class="van-ellipsis">详细地址：{{ address }}</div>
      <div class="van-ellipsis">
        联系方式：<a href="tel:021-6612785">021-6612785</a>
      </div>
    </div>

    <!-- 打卡人气/收藏人气/自定义 -->
    <van-grid class="van-hairline--top" :border="false" :column-num="3">
      <van-grid-item>
        <p class="detail-infor-rank">No.{{ dakarenqi }}</p>
        <p class="detail-infor-flag">打卡人气</p>
      </van-grid-item>
      <van-grid-item>
        <p class="detail-infor-rank">{{ scrq }}</p>
        <p class="detail-infor-flag">收藏人气</p>
      </van-grid-item>
      <van-grid-item>
        <p class="detail-infor-rank">{{ zdyrq }}</p>
        <p class="detail-infor-flag">自定义</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import DetailGallery from "./DetailGallery";
import { getLike, updateLike } from "@/request/like";

export default {
  name: "DetailInfor",
  props: {
    title: String,
    description: String,
    imgs: Array,
    id: [String, Number],
    address: String,
    dakarenqi: [String, Number],
    zdyrq: [String, Number],
    scrq: [String, Number],
  },
  computed: {
    getLikeImg() {
      return this.love ? "like" : "unlike";
    },
  },
  data() {
    return {
      love: false,
    };
  },
  components: {
    DetailGallery,
  },
  mounted() {
    this.getLikeStatu();
  },
  methods: {
    async refreshLike() {
      const json = await updateLike(this.id);
      if (json.code === 1) {
        this.$toast.success("收藏成功");
        this.love = !this.love;
      } else {
        this.$toast.fail(json.msg || "收藏失败");
      }
    },
    async getLikeStatu() {
      const json = await getLike();
      if (json.code === 1) {
        const allLikes = json.data;
        const ifLike = allLikes.find((item) => item.id === this.id);
        if (ifLike) this.love = true;
      }
    },
  },
};
</script>

<style>
.detail-infor {
  margin-top: -30px;
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #fff;
  padding: 10px 4px;
  margin-bottom: 10px;
}
.detail-infor-title {
  color: rgba(49, 71, 128, 1);
  font-size: 18px;
  line-height: 2;
  margin: 0;
  padding: 0px 16px;
}
.detail-infor-desc {
  color: rgba(49, 71, 128, 1);
  font-size: 12px;
  line-height: 2;
  padding: 0px 16px;
}
.detail-like {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  align-items: center;
}
.detail-like-text {
  color: rgba(51, 51, 51, 1);
  font-size: 12px;
  line-height: 1.5;
}
.detail-infor-text {
  padding: 10px 16px;
  overflow: hidden;
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  line-height: 18px;
}
.detail-infor-rank {
  color: rgba(129, 106, 253, 1);
  font-size: 22px;
  line-height: 1.2;
  margin: 0;
}
.detail-infor-flag {
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}
</style>