<template>
  <div class="detail-footer">
    <van-grid :border="false" :column-num="getColumnNum">
      <van-grid-item v-if="needShare">
        <van-button
          round
          :plain="getShareButtunStyle"
          type="primary"
          color="rgba(129, 106, 253, 1)"
          block
          @click="setShare"
          >分享
        </van-button>
      </van-grid-item>
      <van-grid-item v-if="needDaka">
        <van-button
          round
          type="primary"
          color="rgba(129, 106, 253, 1)"
          block
          @click="switchDaka"
          >我要打卡
        </van-button>
      </van-grid-item>
    </van-grid>
    <PopupShare v-on:toggle-popup="toggleShare" v-if="showShare" />
    <PopupDaka v-on:toggle-popup="toggleDaka" :url="url" v-if="showDaka" />
    <PopupLogin v-on:toggle-popup="toggleLogin" v-if="showLogin" />
    <van-popup v-model="showWechatShare">
      <van-image
        class="wechat_share"
        :src="wechatShareImg"
        @click="closeWechatShare"
      />
    </van-popup>
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
  <!--  "https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"-->
</template>

<script>
import { refreshDaka } from '@/request/daka'
import { getWxConfig } from '@/request/wxConfig'
import { wxConfig, isInWeChatApp, getLocation } from '@/utils'
import PopupShare from './PopupShare.vue'
import PopupDaka from './PopupDaka.vue'
import PopupLogin from './PopupLogin.vue'
import CardDialog from '@/components/CardDialog'
// import HTML2canvas from 'html2canvas';
import wechatShareImg from '@/assets/open-wechat.jpg'

export default {
  name: 'DetailFooter',
  components: {
    CardDialog,
    PopupShare,
    PopupDaka,
    PopupLogin
  },
  props: {
    needShare: Boolean,
    needDaka: Boolean,
    id: [String, Number],
    pageData: Object
  },
  computed: {
    getColumnNum() {
      return this.needShare + this.needDaka
    },
    getShareButtunStyle() {
      if (this.needShare && !this.needDaka) {
        return false
      }
      return true
    }
  },
  data() {
    return {
      wechatShareImg,
      showShare: false,
      showDaka: false,
      showLogin: false,
      showCard: false, // 控制海报显示(完成其他业务逻辑之后将此赋值true就可以显示海报)
      showWechatShare: false,
      url: '',
      mineCard: {
        img1: 'https://haoshengyi.link/uploadfile/202203/78f141123c39382.png', // 头像地址
        img2: 'https://haoshengyi.link/uploadfile/202203/78f141123c39382.png', // 大图地址
        name: 'imageName', // 保存图片名称
        username: '', // 账号名称
        data: '2022', // 左上角上排
        subData: '04/11', // 左上角下排
        codeSize: 66, // 二维码大小
        codeContent: 'codeContent', // 二维码内容
        tips: '"鸟欲高飞先振翅,人求上进先读书"', // 文字内容
        author: ''
      } // 海报相关
    }
  },
  async created() {
    this.initWxConfig()
  },

  methods: {
    // 保存前回调
    onTapSave(canvas) {
      console.log(canvas) // canvas content
      console.log('正在保存')
      return true
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
    setShare() {
      this.showShare = true
    },
    toggleShare(e) {
      if (e == 'click') {
        this.showWechatShare = true
      }
      this.showShare = false
    },
    setDaka() {
      this.showDaka = true
    },
    toggleDaka() {
      this.showDaka = false
    },
    toggleLogin() {
      this.showLogin = false
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
    async dakaAction({ lng, lat, id }) {
      console.log(lng, lat)
      if (!this.id) return
      const json = await refreshDaka({
        lng,
        lat,
        id
      })
      if (json === '未登录') {
        this.showLogin = true
      } else if (json?.code === 1) {
        // this.url = json?.url;
        console.log('json?.dakaAction', json)
        // this.$toast.success("打卡成功");
        this.mineCard.img1 = json.data.avatar;
        this.mineCard.username = json.data.nickname;
        this.mineCard.codeContent = json.data.qrcode;
        this.mineCard.name = json.data.title;
        this.mineCard.img2 = json.data.mxp;
        this.mineCard.data = json.data.dktime.substr(0,3);
        this.mineCard.subData = json.data.dktime.substr(5,6) + "/" + json.data.dktime.substr(8,9);
        this.showCard = true // 最后显示海报
        this.setDaka()
        await this.$emit('daka-action')
      } else {
        this.$toast.fail(json?.msg || '打卡失败')
      }
    },
    async initWxConfig() {
      if (isInWeChatApp()) {
        const json = await getWxConfig()
        if (json?.code === 1) {
          wxConfig(json.data)
        }
      }
    },
    switchDaka() {
       if (isInWeChatApp()) {
         // 在微信中
         console.log("1");
         this.wxGetLocation();
       } else {
         // 否则
         console.log("2");
         this.daka();
       }

      // 设置必要数据(头像,图片,昵称...)
      // this.mineCard.img1 = "http://xxx";
      const date = new Date()
      this.mineCard.img2 = this.pageData.postcard
      this.mineCard.username = 'summer'
      this.mineCard.data = date.getFullYear() + ''
      this.mineCard.subData = (date.getMonth() + 1) + '/' + date.getDate()
      
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

    closeDialog() {
      this.showCard = false
    },

    closeWechatShare() {
      this.showWechatShare = false
      this.showShare = true
    },
    close() {
      this.closeDialog()
    }
  }
}
</script>

<style>
.detail-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  border-top: 1px solid #efefef;
  background: #fff;
  overflow: hidden;
}
.wechat_share {
  width: 100vw;
  height: 100vh;
}
</style>
