<template>
  <div id="app">
    <DetailHeader src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    <DetailInfor title="图书馆名称" subTitle="营业时间" :imgs="imgs" />
    <DetailWeChat />
    <DetailNews :news="news" />
    <DetailMore :detail="detail" />
    <DetailFooter />
  </div>
</template>

<script>
import DetailHeader from "./components/DetailHeader"
import DetailInfor from "./components/DetailInfor"
import DetailNews from "./components/DetailNews"
import DetailMore from "./components/DetailMore"
import DetailWeChat from "./components/DetailWeChat"
import DetailFooter from "./components/DetailFooter"

export default {
  name: "App",
  components: {
    DetailHeader,
    DetailInfor,
    DetailNews,
    DetailMore,
    DetailWeChat,
    DetailFooter
  },
  data() {
    return {
      imgs: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
        "https://img01.yzcdn.cn/vant/apple-3.jpg",
      ],
      news: [
        {
          id: 123,
          title: '疫情之势，核久必封，封久必核,疫情之势，核久必封，封久必核',
          date: '2022/02/02'
        },
        {
          id: 123,
          title: '我和你共筑地球村',
          date: '2022/02/03'
        },
        {
          id: 123,
          title: '冷风吹着她，我要跟她回家',
          date: '2022/02/04'
        }
      ],
      detail: '<p>用户自定义编写的文章内容</p>'
    };
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
