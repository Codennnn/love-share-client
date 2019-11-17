<template>
  <div id="layout-main">
    <div id="content-area">
      <!-- 头部 -->
      <TheNavbar />

      <div class="router-view px-6">
        <div class="router-content pt-24">
          <!-- 面包屑导航 -->
          <transition
            enter-active-class="animated zoomIn faster"
            leave-active-class="animated zoomOut faster"
            mode="out-in"
          >
            <div
              class="flex items-center mt-1 ml-1 mb-3"
              v-if="$route.meta.breadcrumb"
            >
              <i
                class="iconfont icon-back"
                @click="$router.go(-1)"
              ></i>
              <vs-breadcrumb
                separator="chevron_right"
                :items="$route.meta.breadcrumb"
              ></vs-breadcrumb>
            </div>
          </transition>

          <!-- 主区域 -->
          <transition
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"
            mode="out-in"
          >
            <router-view />
          </transition>
        </div>

        <!-- 页脚 -->
        <TheFooter class="router-footer" />
      </div>

      <!-- 回到顶部按钮 -->
      <BackToTop
        bottom="5%"
        visibleoffset="500"
      >
        <vs-button
          icon="arrow_upward"
          class="shadow-lg"
        />
      </BackToTop>
    </div>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'Main',
  components: {
    TheNavbar,
    TheFooter,
    BackToTop,
  },
}
</script>

<style lang="scss" scoped>
$footer-height: 65px;

#layout-main {
  position: relative;
  min-width: 900px;
  background: rgb(248, 248, 248);
}

.router-view {
  position: relative;
  min-height: 100vh;
  .router-content {
    min-height: calc(100vh - #{$footer-height});
  }
  .router-footer {
    height: $footer-height;
    line-height: $footer-height;
  }
}
</style>
