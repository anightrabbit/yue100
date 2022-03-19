<template>
  <div class="detail-gallery">
    <van-swipe :loop="false" :width="150" :show-indicators="false">
      <van-swipe-item v-for="(img, index) in imgs" :key="index">
        <van-image
          width="140"
          height="100"
          class="detail-gallery-item"
          :src="img"
          @click="showGallery(index)"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  name: "DetailGallery",
  props: {
    imgs: Array,
  },
  methods: {
    showGallery(num) {
      ImagePreview({
        images: this.imgs,
        startPosition: num,
      });
    },
  },
};
</script>

<style>
.detail-gallery {
  position: relative;
  height: 100px;
  padding: 10px 16px;
  overflow: hidden;
}
.detail-gallery-item {
  width: 140px;
  height: 100px;
  border-radius: 8px;
  margin-right: 10px;
  overflow: hidden;
}
</style>