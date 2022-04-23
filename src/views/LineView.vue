<template>
  <div class="line_view">
    <img class="bgc" src="../assets/ling-bgc.png" />
    <div class="content">
      <div class="img_wrap">
        <img
          src="https://haoshengyi.link/uploadfile/202203/78f141123c39382.png"
        />
      </div>
      <div class="detail">
        <h3>{{pageData.title}}</h3>
        <span class="address">地址: {{pageData.address}}</span>
        <p>
          {{pageData.description}}
        </p>
      </div>
      <!-- <div v-if="pageData.shifoukedaka === '是'"  v-bind:class="{'clock_in' : !pageData.isdaka,'clock_out': pageData.isdaka}">
        <div @click="switchDaka">立即打卡</div>
      </div> -->
    </div>
      <DetailFooter :isDaka="!!pageData.isdaka" :needDaka="pageData.shifoukedaka == '是'" :id="pageData.id" v-on:daka-action="getPageData" />
  </div>
</template>

<script>
import DetailFooter from '@/components/DetailFooter'
import getDetail from '@/request/detail'

export default {
  name: 'LineView',
  components: {
    DetailFooter
  },

  data() {
    return {
      mineCard: {
        img1: 'https://haoshengyi.link/uploadfile/202203/78f141123c39382.png', // 头像地址
        img2: 'https://haoshengyi.link/uploadfile/202203/78f141123c39382.png', // 大图地址
        name: 'imageName', // 保存图片名称
        username: '', // 账号名称
        data: '2022', // 左上角上排
        subData: '04/11', // 左上角下排
        codeSize: 66, // 二维码大小
        codeContent: '', // 二维码内容
        tips: '"鸟欲高飞先振翅,人求上进先读书"', // 文字内容
        author: ''
      }, // 海报相关
      pageData: {},
      showCard: false,
    }
  },

  created() {
    this.getPageData();
    
  },

  
  methods: {
    async getPageData() {
      const params = this.$route.params
      const json = await getDetail(params?.id)
      this.id = params?.id;
      this.loading = false
      if (json.code === 1) {
        this.pageData = json.data
        console.log(this.pageData);
      } else {
        this.$toast.fail(json.msg || '网络异常')
      }
    }
  }
}
</script>

<style scoped>
.bgc {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
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

.img_wrap img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
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
