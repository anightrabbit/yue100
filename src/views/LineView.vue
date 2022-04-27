<template>
  <div class="line_view" :style="{'background-image':`url(${pageData.thumb})`}">
    <div class="content">
      <div class="img_wrap">
        <van-image class="img_wrap_img" :src="pageData.thumb" width="140" height="140" />
      </div>
      <div class="detail">
        <h3>{{ pageData.title }}</h3>
        <span class="address">地址: {{ pageData.address }}</span>
        <p>
          {{ pageData.description }}
        </p>
      </div>
      <!-- <div v-if="pageData.shifoukedaka === '是'"  v-bind:class="{'clock_in' : !pageData.isdaka,'clock_out': pageData.isdaka}">
        <div @click="switchDaka">立即打卡</div>
      </div> -->
    </div>
    <DetailFooter
      :isDaka="!!pageData.isdaka"
      :needDaka="pageData.shifoukedaka == '是'"
      :id="pageData.id"
      v-on:daka-action="getPageData"
      :pageData="pageData"
    />
  </div>
</template>

<script>
import DetailFooter from "@/components/DetailFooter";
import getDetail from "@/request/detail";

export default {
  name: "LineView",
  components: {
    DetailFooter,
  },

  data() {
    return {
      mineCard: {
        img1: "https://haoshengyi.link/uploadfile/202203/78f141123c39382.png", // 头像地址
        img2: "https://haoshengyi.link/uploadfile/202203/78f141123c39382.png", // 大图地址
        name: "imageName", // 保存图片名称
        username: "", // 账号名称
        data: "2022", // 左上角上排
        subData: "04/11", // 左上角下排
        codeSize: 66, // 二维码大小
        codeContent: "", // 二维码内容
        tips: '"鸟欲高飞先振翅,人求上进先读书"', // 文字内容
        author: "",
      }, // 海报相关
      pageData: {},
      pageId: "",
      showCard: false,
    };
  },

  created() {
    const params = this.$route.params;
    this.pageId = params?.id;
    this.getPageData();
  },

  methods: {
    async getPageData() {
      if (!this.pageId) return false;
      const json = await getDetail(this.pageId);
      this.loading = false;
      if (json.code === 1) {
        this.pageData = json.data;
        console.log(this.pageData);
      } else {
        this.$toast.fail(json.msg || "网络异常");
      }
    },
  },
};
</script>

<style scoped>
.line_view {
  background-repeat: no-repeat;
  background-size: auto;
  height: 100%;
  position: relative;
}
.line_view::after {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0,.6);
  box-shadow:0 0 30px 30px rgba(100, 100, 100, 1) inset;
}

.content {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 60vh;
  border-radius: 20px 20px 0 0;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 2;
}

.content .detail {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 80px;
  color: #263d79;
}

.detail h3 {
  margin-bottom: 6px;
}

.detail .address {
  margin-bottom: 20px;
}

.detail p {
  box-sizing: border-box;
  font-size: 14px;
  color: #000;
}

.img_wrap {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translatex(-50%);

  width: 140px;
  height: 140px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
}

.img_wrap_img {
  border-radius: 10px;
  overflow: hidden;
}

.clock_in {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translatex(-50%);

  height: 35px;
  width: 90%;
  background-color: #816afd;
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.clock_out {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translatex(-50%);

  height: 35px;
  width: 90%;
  background-color: rgb(190, 184, 230);
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.clock_in div {
  color: #fff;
}
</style>
