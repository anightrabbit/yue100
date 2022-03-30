<template>
  <div class="detail-news">
    <h2 class="detail-title">最新动态</h2>
    <ul :class="[showAll ? 'detail-news-list' : 'detail-news-list news-hide']" id="detail-news-list">
      <li
        v-for="item in news"
        :key="item.id"
        @click="gotoDetail(item.id)"
      >
        <a href="" class="van-ellipsis">{{ item.title }}</a
        ><span>{{ item.addtime }}</span>
      </li>
    </ul>
    <div @click="toggleNews" class="detail-news-option" v-if="news.length > 2">
      <span v-if="!showAll">展开全部{{ news.length }}条动态</span>
      <span v-else>收起</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailNews",
  props: {
    news: Array,
  },
  data() {
    return {
      showAll: false
    }
  },
  methods: {
    toggleNews() {
      this.showAll = !this.showAll
      const dom = document.getElementById('detail-news-list')
      !this.showAll ? dom.classList.add('news-hide') : dom.classList.remove('news-hide')
    },
    gotoDetail(id) {
      return this.$router.push({
        path: `/news/${id}`,
      });
    }
  },
};
</script>

<style>
.detail-news {
  padding: 10px 20px;
  background: #fff;
  margin-bottom: 10px;
}
.detail-title {
  color: rgba(49, 71, 128, 1);
  font-size: 18px;
  line-height: 1.2;
  margin: 0 0 10px 0;
  padding: 0;
}
.detail-news-list li {
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
  line-height: 18px;
  background: rgba(245, 245, 245, 1);
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.detail-news-list li a {
  color: rgba(102, 102, 102, 1);
}
.news-hide {
  height: 68px;
  overflow: hidden;
}
.detail-news-option {
  text-align: center;
  line-height: 18px;
  color: rgba(129, 106, 253, 1);
  font-size: 12px;
}
</style>