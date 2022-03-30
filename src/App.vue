<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
}
</style>
