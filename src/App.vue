<template>
  <div id="app">
    <van-skeleton title avatar :row="3" :loading="loading">
      <template v-if="pageData">
        <DetailHeader :src="pageData.thumb" />
        <DetailInfor
          :title="pageData.title"
          subTitle="营业时间"
          :imgs="pageData.images"
          :address="pageData.address"
          :dakarenqi="pageData.dakarenqi"
          :scrq="pageData.scrq"
          :zdyrq="pageData.zdyrq"
        />
        <DetailWeChat />
        <DetailNews :news="news" />
        <DetailMore :detail="pageData.content" />
        <DetailFooter />
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import DetailHeader from "./components/DetailHeader";
import DetailInfor from "./components/DetailInfor";
import DetailNews from "./components/DetailNews";
import DetailMore from "./components/DetailMore";
import DetailWeChat from "./components/DetailWeChat";
import DetailFooter from "./components/DetailFooter";

import getDetail from "./request/detail";
import { getUrlQuery } from "./utils";

export default {
  name: "App",
  components: {
    DetailHeader,
    DetailInfor,
    DetailNews,
    DetailMore,
    DetailWeChat,
    DetailFooter,
  },
  data() {
    return {
      news: [
        {
          id: 123,
          title: "疫情之势，核久必封，封久必核,疫情之势，核久必封，封久必核",
          date: "2022/02/02",
        },
        {
          id: 123,
          title: "我和你共筑地球村",
          date: "2022/02/03",
        },
        {
          id: 123,
          title: "冷风吹着她，我要跟她回家",
          date: "2022/02/04",
        },
      ],
      loading: true,
      pageData: null,
      // pageData: {
      //   address: "上海市虹口区公平路18号8栋嘉昱大厦一层",
      //   content:
      //     '<p><img src="http://47.97.210.216/uploadfile/202203/6a14e98b0b801b1.png" title="image.png" alt="image.png"></p><p class="MsoNormal"><span style="font-size:14.0pt">建投书店坐落于上海虹口北外滩黄浦江边，被誉为<span lang="EN-US">“</span>沪上最美书店<span lang="EN-US">”</span>之一。<span lang="EN-US">2016</span>年开业后，凭借其得天独厚的地理优势以及匠心独运的设计风格，还有书店扎实稳健的经营管理和锐意创新的发展模式，成为上海名副其实的文化地标。书店共分上下四层，空间开阔，选品丰富，</span><v id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">\r\n <v joinstyle="miter">\r\n <v>\r\n  <v eqn="if lineDrawn pixelLineWidth 0">\r\n  <v eqn="sum @0 1 0">\r\n  <v eqn="sum 0 0 @1">\r\n  <v eqn="prod @2 1 2">\r\n  <v eqn="prod @3 21600 pixelWidth">\r\n  <v eqn="prod @3 21600 pixelHeight">\r\n  <v eqn="sum @0 0 1">\r\n  <v eqn="prod @6 1 2">\r\n  <v eqn="prod @7 21600 pixelWidth">\r\n  <v eqn="sum @8 21600 0">\r\n  <v eqn="prod @7 21600 pixelHeight">\r\n  <v eqn="sum @10 21600 0">\r\n </v></v></v></v></v></v></v></v></v></v></v></v></v>\r\n <v o:extrusionok="f" gradientshapeok="t" o:connecttype="rect">\r\n <o v:ext="edit" aspectratio="t">\r\n</o></v></v></v><v id="图片_x0020_35" o:spid="_x0000_s1027" type="#_x0000_t75" style="position: absolute; left: 0px; margin-left: 1.8pt; margin-top: 69.8pt; width: 226.7pt; height: 188.95pt; z-index: 251692032; visibility: visible;">\r\n <v src="file:///C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\msohtmlclip1\\01\\clip_image001.jpg" o:title="">\r\n <w type="through">\r\n</w></v></v><span style="font-size:14.0pt">约有<span lang="EN-US">20,000</span>册图书，不仅深入演绎人物传记图书主题，更是覆盖人文社科、艺术设计，生活方式乃至儿童图书，且在更大范围内采集优秀的高端文化衍生品。当然了建投书店最具特色、广受读者喜爱的还是其中的传记图书馆大厅，拥有挑高<span lang="EN-US">14</span>米的穹顶造型，落地玻璃幕墙</span><v id="图片_x0020_36" o:spid="_x0000_s1026" type="#_x0000_t75" style="position: absolute; left: 0px; margin-left: 173.8pt; margin-top: 330.9pt; width: 225pt; height: 187.5pt; z-index: -251623424; visibility: visible;">\r\n <v src="file:///C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\msohtmlclip1\\01\\clip_image002.jpg" o:title="">\r\n <w type="tight" anchorx="margin">\r\n</w></v></v><span style="font-size:14.0pt">直面浦江，浦东陆家嘴的标志性建筑历历在目；精心开辟和设计的艺术长廊、主题阅览室和咖啡厅，旨在满足读者以阅读为核心，容纳社交、展览、休闲等为一体的多元文化需求。建投书局以为读者开启完整阅读的新入口，让读者体验充满诚意的文化盛宴作为办店的核心理念。而且很多的常客更是给建投书店送上了一个<span lang="EN-US">“</span>霍格沃茨魔法书店<span lang="EN-US">”</span>的称号，以此我们不难看出，建投书店的最美书店以及其受欢迎程度。<span lang="EN-US"><o></o></span></span></p>',
      //   dakarenqi: "430",
      //   description:
      //     "建投书店坐落于上海虹口北外滩黄浦江边，被誉为“沪上最美书店”之一。",
      //   hits: "3",
      //   id: "60",
      //   images: [],
      //   keywords: "建投书局",
      //   map_lat: "31.256346000000000",
      //   map_lng: "121.515835000000000",
      //   offiaccount: "",
      //   postcard: "",
      //   scrq: "220",
      //   shdtzb: "7058,9666",
      //   thumb: "http://47.97.210.216/uploadfile/202203/6a14e98b0b801b1.png",
      //   title: "建投书局",
      //   zdyrq: 2931,
      // },
    };
  },

  created() {
    // url?id=60 取url上的参数id值
    const urlQuery = getUrlQuery();
    this.getPageData(urlQuery?.id);
  },
  methods: {
    async getPageData(id) {
      this.$toast.loading("加载中...");
      const json = await getDetail(id);
      if (json.code === 1) {
        this.pageData = json.data;
        this.loading = false;
      } else {
        this.$toast.fail("请求失败");
      }
    },
  },
};
</script>

<style>
html {
  -webkit-tap-highlight-color: transparent;
}
body {
  max-width: 100vw;
  margin: 0;
  color: #323233;
  font-size: 16px;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
}
#app {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100px;
}
</style>
