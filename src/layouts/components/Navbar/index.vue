<template>
  <div class="nav-bar box-shadow">
    <div>
      <router-link v-for="(item, index) in navIcons" :key="index" :to="item.route">
        <el-tooltip :open-delay="200" :content="item.tip" effect="light">
          <i class="nav-icon iconfont" :class="item.icon"></i>
        </el-tooltip>
      </router-link>
    </div>
    <div class="nav-right">
      <div>
        <i class="nav-icon iconfont icon-screenfull" @click="screenfull"></i>
      </div>
      <div class="info">
        <div style="font-size: 18px;">陈梓聪</div>
        <small>新媒体工作部</small>
      </div>
      <el-popover transition="el-zoom-in-bottom" class="popover">
        <template v-for="(pop, index) in popItems">
          <router-link :to="pop.route" :key="index" class="popover-item">
            <div>
              <div class="inner-item">
                <i class="inner-icon" :class="pop.icon"></i>
                <div class="inner-text">{{ pop.text }}</div>
              </div>
            </div>
          </router-link>
        </template>
        <img slot="reference" src="@/assets/images/avatar.jpg" class="avatar" />
      </el-popover>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "NavBar",
  data() {
    return {
      activeIndex: "1",
      popItems: [
        { icon: "el-icon-user", text: "我的信息", route: "" },
        { icon: "el-icon-trophy", text: "我的社团", route: "/my-club" },
        { icon: "el-icon-switch-button", text: "退出登录", route: "/login" }
      ],
      navIcons: [
        { tip: "社团", icon: "icon-medal", route: "/club-list" },
        { tip: "动态", icon: "icon-dynamic", route: "/dynamic-list" },
        { tip: "活动", icon: "icon-activity", route: "/activity-list" }
      ]
    };
  },
  mounted() {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false;
      }
    };
  },
  methods: {
    // 网页全屏
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: "您的浏览器不支持全屏显示",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = true;
    },

    // 是否全屏并按键ESC键的方法
    checkFull() {
      let isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    }
  }
};
</script>

<style lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #ffffff;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-icon {
  margin-right: 12px;
  cursor: pointer;
  font-size: 25px;
  color: #686868;
}

.info {
  margin-left: 15px;
  text-align: right;
  small {
    color: #919191;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 8px #686868;
  overflow: hidden;
}

.avatar:hover {
  cursor: pointer;
}

.popover {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.popover-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  color: #686868;
  &:hover {
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
    background-color: #7367f0;
  }
  .inner-item {
    display: flex;
    align-items: center;
  }
  .inner-icon {
    font-size: 16px;
    font-weight: 500;
  }
  .inner-text {
    margin-left: 6px;
  }
}

.el-popover {
  padding: 0;
}
</style>
