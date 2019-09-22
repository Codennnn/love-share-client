<template>
  <div class="layout-main">

    <!-- 侧边栏 -->
    <Sidebar />

    <div
      id="content-area"
      :class="{'content-area-full': sidebarCollapse}"
    >
      <div class="content-wrapper">
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

        <!-- 头部 -->
        <Navbar />

        <div class="router-view p-6">
          <div class="router-content">
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
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'Main',
  components: {
    Sidebar,
    Navbar,
    Footer,
    BackToTop,
  },

  computed: {
    sidebarCollapse() {
      return this.$store.state.sidebarCollapse
    },
  },
}
</script>

<style lang="scss" scoped>
.layout-main {
  position: relative;
  height: 100%;
  background-color: rgb(245, 245, 245);
}

#content-area {
  min-height: 100%;
  min-width: 900px;
  margin-left: $side-bar-width;
  transition: margin-left 0.5s;
  &.content-area-full {
    margin-left: 65px;
  }
  .content-wrapper {
    min-height: 100vh;
  }
}

.router-view {
  position: relative;
  min-height: 100vh;
  .router-content {
    padding-top: 4.5rem;
    .icon-back {
      cursor: pointer;
      font-size: 30px;
      color: rgb(133, 133, 133);
      transition: all 0.3s;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
