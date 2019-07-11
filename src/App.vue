<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default { name: 'app' };
</script>

<style lang="scss">
#app {
  height: 100vh;
  background-color: rgb(245, 245, 245);
}

#nprogress .bar {
  background: $primary !important; // 重设跳转进度条的颜色
}
</style>
