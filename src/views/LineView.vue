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
      <div v-if="pageData.shifoukedaka === '是'"  v-bind:class="{'clock_in' : !pageData.isdaka,'clock_out': pageData.isdaka}">
        <div @click="switchDaka">立即打卡</div>
      </div>
    </div>
    <van-dialog
      v-if="showCard"
      v-model="showCard"
      :show-confirm-button="false"
      style="background-color: transparent; margin-top: 20px"
    >
      <CardDialog
        :name="mineCard.name"
        :username="mineCard.username"
        :data="mineCard.data"
        :sub-data="mineCard.subData"
        :code-size="mineCard.codeSize"
        :code-content="mineCard.codeContent"
        :tips="mineCard.tips"
        :author="mineCard.author"
        :img1="mineCard.img1"
        :img2="mineCard.img2"
        :img2-height="280"
        :on-saved="onSaved"
        :on-tap-save="onTapSave"
        :closeDialog="closeDialog"
        :on-tap="close"
      />
    </van-dialog>
  </div>
</template>

<script>
import CardDialog from '@/components/CardDialog'
import getDetail from '@/request/detail'
import { wxConfig, isInWeChatApp, getLocation } from '@/utils'
import {getWxConfig} from "@/request/wxConfig";
import { refreshDaka } from '@/request/daka'

export default {
  name: 'LineView',
  id:0,
  components: {
    CardDialog
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
    // 查询详情
    this.initWxConfig()
    this.getPageData();
    
  },

  
  methods: {
    async initWxConfig() {
      if (isInWeChatApp()) {
        const json = await getWxConfig()
        if (json?.code === 1) {
          wxConfig(json.data)
        }
      }
    },
    kedaka(){
      return this.pageData.shifoukedaka == '是'
    },

    switchDaka() {
        if (isInWeChatApp()) {
         // 在微信中
         console.log("1");
         this.wxGetLocation();
       } else {
         // 否则
         this.daka();
         console.log("2");   
       }

      const date = new Date()
      this.mineCard.img2 = this.pageData.postcard
      this.mineCard.username = 'summer'
      this.mineCard.data = date.getFullYear() + ''
      this.mineCard.subData = date.getMonth() + '/' + date.getDate()
      
    },

    daka() {
      this.$toast.loading({
        message: '打卡中...',
        forbidClick: true
      })
      if (navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(
          (json) => {
            const pos = json.coords
            console.log('Latitude : ' + pos.latitude)
            console.log('Longitude: ' + pos.longitude)
            this.dakaAction({
              lng: pos.longitude,
              lat: pos.latitude,
              id: this.id
            })
          },
          (error) => {
            this.$toast.fail(error?.message || '定位失败')
            this.$emit('daka-action', 1, 2)
          },
          {
            enableHighAccuracy: true,
            timeout: 5000, // 5s超时设置
            maximumAge: 0
          }
        )
      } else {
        this.$toast.fail('当前浏览器不支持该功能')
      }
    },

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
    },

    closeDialog() {
      this.showCard = false
    },

    closeWechatShare() {
      this.showWechatShare = false
      this.showShare = true
    },

    close() {
      this.closeDialog()
    },

    // 保存成功回调
    onSaved() {
      console.log('保存成功')
    },
    // 其他按钮事件
    onTab() {
      this.showShare = false
      console.log('封装其他按钮事件')
    },

    // 保存前回调
    onTapSave(canvas) {
      console.log(canvas) // canvas content
      console.log('正在保存')
      return true
    },
     wxGetLocation() {
      getLocation(
        (pos) => {
          this.dakaAction({
            lng: pos.longitude,
            lat: pos.latitude,
            id: this.id
          })
        },
        (error) => {
          this.$toast.fail(error?.message || '定位失败')
          this.$emit('daka-action', 1, 2)
        }
      )
    },
    async dakaAction({ lng, lat, id }) {
      console.log(lng, lat)
      if (!this.id) return
      const json = await refreshDaka({
        lng,
        lat,
        id
      })
      if (json === '未登录') {
        console.log('未登录')
      } else if (json?.code === 1) {
        // this.url = json?.url;

        this.$toast.success("打卡成功");
        this.mineCard.img1 = json.data.avatar;
        this.mineCard.username = json.data.nickname;
        this.mineCard.codeContent = json.data.qrcode;
        this.mineCard.name = json.data.title;
        this.mineCard.img2 = json.data.mxp;
        this.mineCard.data = json.data.dktime.substr(0,3);
        this.mineCard.subData = json.data.dktime.substr(5,6) + "/" + this.json.data.dktime.substr(8,9);
        this.showCard = true // 最后显示海报
      } else {
        this.$toast.fail(json?.msg || '打卡失败')
      }
    },
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
