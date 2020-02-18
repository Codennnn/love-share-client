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
        class="content absolute w-64 radius bg-white overflow-hidden"
        :class="{'active': isHover}"
      >
        <div class="p-5">
          <div
            class="name mt-5 text-center"
            :class="{'active': isHover}"
          >
            <div>{{ info.nickname }}</div>
            <small style="color: #919191;">{{ info.school.name }}</small>
          </div>

          <!-- 乐享值 -->
          <div
            class="progress my-2 flex items-center"
            :class="{'active': isHover}"
          >
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

          <!-- 路由链接 -->
          <div
            class="link-grid text-sm text-gray-600"
            :class="{'active': isHover}"
          >
            <router-link
              tag="div"
              class="link"
              v-for="(link, i) in routerLinks"
              :key="i"
              :to="link.to"
            >
              <feather
                class="mr-1"
                size="16"
                :type="link.icon"
              ></feather>
              <span>{{ link.label }}</span>
            </router-link>
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

const routerLinks = [
  { label: '消息中心', icon: 'bell', to: '/message' },
  { label: '个人空间', icon: 'user', to: '/user-center' },
  { label: '我的订单', icon: 'shopping-bag', to: '/order-list' },
  { label: '我的收藏', icon: 'star', to: '/user-collections' },
]
export default {
  name: 'Avatar',
  data: () => ({
    routerLinks,
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

  .name {
    &.active {
      animation: slide-left 0.3s ease-out;
    }
  }

  .progress {
    &.active {
      animation: slide-left 0.4s ease-out;
    }
  }

  .link-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 0.5rem;
    &.active {
      animation: slide-left 0.45s ease-out;
    }
    .link {
      display: flex;
      align-items: center;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        color: $primary;
      }
    }
  }
}

@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  70% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
