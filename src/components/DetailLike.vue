<template>
  <!-- 收藏/取消收藏 -->
  <div>
    <div class="detail-like" @click="refreshLike">
      <van-image
        width="14"
        height="14"
        :src="require(`../assets/${getLikeImg}.svg`)"
        style="margin-right: 5px"
      />
      <span class="detail-like-text">{{ love ? "已" : "" }}收藏</span>
    </div>
    <PopupLogin v-on:toggle-popup="toggleLogin" v-if="showLogin" />
  </div>
</template>

<script>
import { getLike, updateLike, cancelLike } from "@/request/like";
import PopupLogin from "./PopupLogin.vue";

export default {
  name: "DetailLike",
  props: {
    id: [String, Number],
  },
  components: {
      PopupLogin
  },
  computed: {
    getLikeImg() {
      return this.love ? "like" : "unlike";
    },
  },
  data() {
    return {
      love: false,
      showLogin: false
    };
  },
  mounted() {
    this.getLikeStatu();
  },
  methods: {
    async refreshLike() {
      if (!this.love) {
        const json = await updateLike(this.id);
        if(json === '未登录') {
            this.showLogin = true;
            return;
        }
        if (json.code === 1) {
          this.$toast.success("收藏成功");
          this.love = !this.love;
          this.$emit("like-action", this.id);
        } else {
          this.$toast.fail(json.msg || "收藏失败");
        }
      } else {
        const json = await cancelLike(this.id);
        if (json.code === 1) {
          this.$toast.success("取消收藏成功");
          this.love = !this.love;
          this.$emit("like-action", this.id);
        } else {
          this.$toast.fail(json.msg || "取消收藏失败");
        }
      }
    },
    async getLikeStatu() {
      const json = await getLike();
      if (json?.code === 1) {
        const allLikes = json.data;
        const ifLike = allLikes.find((item) => item.id === this.id);
        if (ifLike) this.love = true;
      }
    },
    toggleLogin() {
        this.showLogin = false;
    }
  },
};
</script>

<style>
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
</style>