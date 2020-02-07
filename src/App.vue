<template>
  <div id="app">
    <!-- 网络状态检测 -->
    <div
      v-show="isOffline"
      class="fixed top-0 w-full h-16 flex-row-center"
      style="z-index: 99999999; left: 50%; width: 250px; transform: translate(-50%, 0);"
    >
      <vs-alert
        class="alert"
        color="danger"
        icon="rss_feed"
        :active="isOffline"
      >
        <span>
          网络不可用，请检测您的网络配置
        </span>
      </vs-alert>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isOffline: false, // 是否处于网络
  }),

  created() {
    this.$store.dispatch('getCategoryList')
    if (this.$login()) {
      this.$store.dispatch('user/initValues')
    }
  },

  mounted() {
    window.addEventListener('online', () => {
      this.isOffline = false
    })
    window.addEventListener('offline', () => {
      this.isOffline = true
    })
  },
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: rgb(245, 245, 245);
}

// 重设跳转进度条的颜色
#nprogress .bar {
  background: $primary !important;
}

// 断网警告
.alert {
  .vs-icon {
    font-size: 1.2rem;
  }
}
</style>
