<template>
  <van-image width="100vw" height="56vw" :src="src" />
</template>

<script>
export default {
  name: "DetailHeader",
  props: {
    src: String,
  },
};
</script>