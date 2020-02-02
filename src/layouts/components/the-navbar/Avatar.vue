<template>
  <div>
    <div
      class="relative"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <router-link
        tag="div"
        to="/user-center"
        class="flex items-center"
      >
        <vs-avatar
          class="avatar w-10 h-10 m-0"
          :class="{'active': isHover}"
          :src="info.avatar_url ? `${info.avatar_url}?imageView2/2/w/40` : ''"
        />
      </router-link>
      <div
        class="content absolute w-64 rounded-lg bg-white overflow-hidden"
        :class="{'active': isHover}"
      >
        <div class="p-5">
          <div class="mt-5 text-center">
            <div>{{ info.nickname }}</div>
            <small style="color: #919191;">{{ info.school.name }}</small>
          </div>
          <div class="my-2 flex items-center">
            <small class="mr-2 text-primary whitespace-no-wrap">乐享值</small>
            <vs-progress
              :percent="info.credit_value / 1000 * 100"
              :height="8"
              :title="`${info.credit_value}/1000`"
              color="primary"
            >primary</vs-progress>
            <small class="ml-2 text-primary whitespace-no-wrap">{{ info.credit_value }}</small>
          </div>
          <vs-divider />
          <div class="flex text-sm text-gray-600">
            <div class="w-1/2">
              <router-link
                tag="div"
                class="link flex items-center cursor-pointer"
                to="/message"
              >
                <i class="el-icon-bell mr-1 text-base"></i>
                <span>消息中心</span>
              </router-link>
            </div>
            <div class="w-1/2">
              <router-link
                tag="div"
                class="link ml-5 flex items-center cursor-pointer"
                to="/user-center"
              >
                <i class="el-icon-user mr-1 text-base"></i>
                <span>我的空间</span>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="py-2 text-sm text-center bg-gray-200 text-gray-500
        hover:text-gray-600 transition cursor-pointer"
          @click="signOut()"
        >
          退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Avatar',
  data: () => ({
    isHover: false,
  }),

  computed: {
    ...mapState('user', ['info']),
  },

  methods: {
    // 退出登录
    async signOut() {
      await this.$store.dispatch('user/signOut')
      this.$router.replace('/sign')
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  z-index: 999;
  transition: all 0.2s;
  &.active {
    transform: scale(1.5) translate(0, 15px);
    box-shadow: 0 0 15px 5px rgba(var(--vs-primary), 0.3);
  }
}

.content {
  top: 52px;
  left: 50%;
  max-height: 0;
  transform: translateX(-50%);
  transition: all 0.3s;
  opacity: 0.6;
  &.active {
    max-height: 500px;
    box-shadow: 0 0 15px 5px rgba(var(--vs-dark), 0.08);
    opacity: 1;
  }
}

.link {
  transition: all 0.3s;
  &:hover {
    color: rgba(var(--vs-primary), 0.9);
  }
}
</style>
