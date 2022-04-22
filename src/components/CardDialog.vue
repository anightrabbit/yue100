<template>
  <div>
    <div id="content" ref="content" class="box">
      <div v-if="baseImg === ''">
        <div class="box-img1">
          <van-image round width="42px" height="42px" :src="img1" />
          <div class="box-username">{{ this.username }}</div>
          <div class="box-data">
            <div class="box-data-sup">{{ this.data }}</div>
            <div class="box-data-sub">{{ this.subData }}</div>
          </div>
        </div>
        <div class="box-img2-sup">
          <div class="box-img21">
            <img
              width="100%"
              :height="img2Height"
              :src="img2"
              fit="cover"
              ref="img1"
              crossorigin="“anonymous”"
            />
          </div>
          <img
            :style="{ marginTop: img2Height / 2 + 'px' }"
            :src="cardImg"
            ref="img2"
            crossorigin="“anonymous”"
          />
        </div>
        <div
          :style="{ marginTop: img2Height - 128 - img2Height / 2 + 'px' }"
        ></div>
        <div class="box-msg">
          <div
            class="box-msg-content"
            style="font-size: 14px; font-weight: bold"
          >
            <p style="margin-bottom: 14px">{{ this.tips }}</p>
            <p>{{ this.author }}</p>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              class="box-msg-code"
              :width="codeSize"
              :src="this.codeContent"
              ref="img3"
            />
          </div>
        </div>
      </div>
      <div v-if="baseImg !== ''">
        <van-image
          :src="baseImg"
          radius="16px"
          style="width: 100%"
          fit="cover"
        />
      </div>
    </div>
    <div
      v-if="baseImg !== ''"
      style="
        display: flex;
        margin-top: 24px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <p style="font-size: 12px; margin-bottom: 10px; color: #fff">长按保存</p>
      <van-button
        round
        block
        plain
        color="#ffffff"
        style="
          background-color: transparent;
          margin: 0 12px;
          width: 140px;
          height: 36px;
        "
        @click="onTap"
        >关闭
      </van-button>
      <!-- <van-button
        round
        block
        plain
        color="#ffffff"
        style="background-color: transparent; margin: 0 12px"
        >保存至相册
      </van-button> -->
    </div>
    <div v-if="baseImg === ''" style="height: 68px"></div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import cardImg from '@/assets/card.png'

export default {
  name: 'CardDialog',
  data() {
    return {
      cardImg,
      baseImg: '',
      imgList: [
        { name: 'img1', value: '' },
        {
          name: 'img2',
          value: 'https://haoshengyi.link/uploadfile/202203/74b2a7568179738.jpg'
        },
        {
          name: 'img3',
          value: 'https://haoshengyi.link/uploadfile/202203/74b2a7568179738.jpg'
        }
      ]
    }
  },
  props: {
    codeSize: Number,
    codeContent: String,
    username: String,
    data: String,
    subData: String,
    tips: String,
    img1: String,
    img2: String,
    author: String,
    img2Height: Number,
    name: String,
    onTap: Function,
    onTapSave: Function,
    onSaved: Function
  },

  created() {
    // this.imgList[0].value = this.img2
  },

  mounted() {
    let that = this
    this.$nextTick(function () {
      setTimeout(function () {
        that.saveImage('content')
      }, 500)
    })
  },
  methods: {
    dataURLToBlob(data) {
      let arr = data.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let st = atob(arr[1])
      let n = st.length
      let u8arr = new Uint8Array(n)
      while (n--) u8arr[n] = st.charCodeAt(n)
      return new Blob([u8arr], { type: mime })
    },
    saveImage(di) {
      console.log('saveImage')
      let canvasID = this.$refs[di]
      let that = this
      let a = document.createElement('a')
      html2canvas(canvasID, {
        useCORS: true,
        tainttest: true, // 检测每张图片都已经加载完成
        logging: false,
        letterRendering: false
      }).then((canvas) => {
        if (this.onTapSave(canvas)) {
          let dom = document.body.appendChild(canvas)
          dom.style.display = 'none'
          a.style.display = 'none'
          document.body.removeChild(dom)
          let toBlob = that.dataURLToBlob(dom.toDataURL('image/png'))
          that.baseImg = dom.toDataURL('image/png')
          a.setAttribute('href', URL.createObjectURL(toBlob))
          a.setAttribute('download', (this.name ?? 'name') + '.png')
          document.body.appendChild(a)
          a.click()
          URL.revokeObjectURL(toBlob)
          document.body.removeChild(a)
          this.onSaved() // 保存成功
        }
      })
    }

  }
}
</script>
<style scoped>
.box {
  background-color: white;
  border-radius: 16px;
}

.box-img1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
}

.box-username {
  margin-left: 8px;
  font-weight: bold;
  color: #323233;
  font-size: 24px;
  flex-grow: 1;
}

.box-data {
  text-align: end;
}

.box-data-sup {
  font-weight: bold;
  color: #323233;
  font-size: 16px;
}

.box-data-sub {
  font-weight: bold;
  color: #323233;
  font-size: 24px;
}

.box-img2-sup {
  position: relative;
  text-align: end;
}

.box-img21 {
  position: absolute;
}

.box-msg {
  display: flex;
  flex-direction: row;
  padding: 24px 16px;
}

.box-msg-content {
  margin-left: 8px;
  color: #303030;
  font-size: 18px;
  max-lines: 2;
  flex-grow: 1;
}

.box-msg-code {
  margin: 0 18px;
}
</style>
