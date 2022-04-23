<template>
  <div id="page" class="uploadImg-page">
    <div ref="wrapper" class="cropper-wrapper">
      <vue-cropper
        ref="cropper"
        v-if="imgUrl"
        :img="imgUrl"
        :outputSize="1"
        outputType="jpeg"
        :autoCropWidth="autoCropWidth"
        :autoCropHeight="autoCropHeight"
        :info="false"
        :autoCrop="true"
        :full="true"
        :canMove="true"
        :canMoveBox="true"
        :original="false"
        :centerBox="true"
        :high="true"
        :fixed="true"
        :fixedNumber="[1.7, 1]"
        :fixedBox="false"
        :enlarge="1"
        mode="90% auto"
      >
      </vue-cropper>
      <van-action-sheet
        v-model="showAction"
        :actions="actions"
        :overlay="false"
        cancel-text="取消"
        description="修改壁纸"
        :lock-scroll="false"
        @cancel="handleActionCancel"
      />
    </div>
  </div>
</template>

<script>
import { getWxConfig } from "@/request/wxConfig";
import { wxConfig, isInWeChatApp, chooseImage } from "@/utils";
import wx from "jweixin-npm";
import { VueCropper } from "vue-cropper";
import { EditImage } from "@/request/post";
import { getUrlQuery } from "@/utils";

export default {
  name: "UploadImg",
  components: {
    VueCropper,
  },
  data() {
    const that = this;
    return {
      imgUrl: "",
      showAction: false,
      actions: [
        {
          name: "提交",
          callback: () => {
            that.$refs.cropper.getCropData((data) => {
              that.$toast.loading({
                message: "提交中。。。",
                forbidClick: true,
                duration: 5,
              });
              EditImage(data);
              setTimeout(function () {
                window.history.back();
              }, 5000);
              //TODO 这里调用接口上传data
              console.log(data);
            });
          },
        },
      ],
      //选取框默认屏幕宽度0.9，与图片默认展示宽度一致
      autoCropWidth: window.screen.width * 0.9,
      autoCropHeight: (window.screen.width * 0.9) / 1.7,
    };
  },
  created() {
    const query = getUrlQuery();
    console.log(query);
    this.initWxConfig();
    wx.ready(() => {
      this.wxChooseImage();
    });
    wx.error(function (err) {
      alert(err);
    });
  },
  methods: {
    async initWxConfig() {
      if (isInWeChatApp()) {
        const json = await getWxConfig();
        if (json?.code === 1) {
          wxConfig(json.data);
        }
      }
    },
    wxChooseImage() {
      chooseImage()
        .then((localData) => {
          this.imgUrl = localData;
          this.showAction = true;
        })
        .catch(({ catchType }) => {
          if (catchType === "cancel") {
            this.handleActionCancel();
          }
        });
    },
    handleActionCancel() {
      //TODO 这里跳转到上一页
      window.history.back();
    },
  },
};
</script>

<style scoped>
.uploadImg-page {
  background: #fff;
  height: 100%;
  padding-bottom: 190px;
  box-sizing: border-box;
}
.cropper-wrapper {
  width: 100%;
  height: 100%;
}
.vue-cropper {
  background-image: none;
}
.cropper-modal {
  background: none;
}
</style>
