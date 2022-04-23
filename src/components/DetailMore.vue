<template>
  <div class="detail-more">
    <h2 class="detail-title">阅读点介绍</h2>
    <div v-html="detail" class="detail-more-infor"></div>
  </div>
</template>

<script>
export default {
  name: "DetailMore",
  props: {
    detail: String,
  },
};
</script>

<style>
.detail-more {
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

.detail-more-infor p {
  margin: 0;
  padding: 0;
  color: rgba(102, 102, 102, 1);
  font-size: 12px!important;
  line-height: 28px;
  margin-bottom: 10px;
}
.detail-more img {
  max-width: 100%;
}
.detail-more p.MsoNormal {
  position: relative;
  overflow: hidden;
}
.detail-more p v {
  display: none;
}
</style>