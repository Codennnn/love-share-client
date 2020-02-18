<template>
  <div>
    <div class="mb-5 p-3 text-center bg-white light-shadow radius">
      <vs-avatar
        size="90px"
        :src="seller.avatar_url ? `${seller.avatar_url}?imageView2/2/w/100` : ''"
        @click="viewUserDetail(seller._id)"
      />
      <div
        class="flex-row-center text-lg cursor-pointer"
        @click="viewUserDetail(seller._id)"
      >
        <span>{{ seller.nickname }}</span>
        <i
          class="el-icon-male ml-1 text-primary"
          v-if="seller.gender === '1'"
        ></i>
        <i
          class="el-icon-female ml-1 text-danger"
          v-else-if="seller.gender === '2'"
        ></i>
      </div>
      <div class="my-1 text-sm text-gray-500">
        {{ seller.school.name }}
      </div>
      <div
        v-if="!$self(seller._id)"
        class="flex justify-center overflow-hidden"
      >
        <span
          class="px-5 py-2 flex items-center justify-center text-white
              text-sm cursor-pointer"
          style="height: 34px; border-radius: 17px;"
          :class="isFollowed
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-primary text-white'"
          @click="isFollowed ? unsubscribe(seller._id) : subscribe(seller._id)"
        >
          <i
            class="el-icon-loading mr-1"
            v-if="isSubscribeLoading"
          ></i>
          {{ isFollowed ? '已关注' : '加关注' }}
        </span>
      </div>
      <div class="flex justify-around mt-3">
        <div>
          <div class="font-semibold">{{ seller.published_num }}</div>
          <div class="text-gray-600 text-sm">已发布</div>
        </div>
        <div>
          <div class="font-semibold">{{ seller.fans_num }}</div>
          <div class="text-gray-600 text-sm">关注者</div>
        </div>
        <div>
          <div class="font-semibold">{{ seller.credit_value }}</div>
          <div class="text-gray-600 text-sm">信用值</div>
        </div>
      </div>
    </div>
    <div
      v-if="!$self(seller._id)"
      class="hover-light py-3 flex-row-center text-white
       bg-primary-gradient radius cursor-pointer overflow-hidden"
      @click="contactSeller()"
    >
      联系卖家
      <div class="light"></div>
    </div>
  </div>
</template>

<script>
import { subscribe, unsubscribe, isUserFollowed } from '@/request/api/user'

export default {
  name: 'DetailUser',
  props: { seller: Object },

  data: () => ({
    isSubscribeLoading: false,
    isFollowed: false,
  }),

  watch: {
    seller: {
      handler() {
        if (this.seller._id) {
          this.isUserFollowed(this.seller._id)
        }
      },
      immediate: true,
    },
  },

  methods: {
    // 查看用户详情
    viewUserDetail(userId) {
      this.$router.push({
        path: '/user-detail',
        query: { userId },
      })
    },

    // 关注
    async subscribe(user_id) {
      this.isSubscribeLoading = true
      try {
        const { code } = await subscribe({ user_id })
        if (code === 2000) {
          this.isFollowed = true
        }
      } finally {
        this.isSubscribeLoading = false
      }
    },

    // 取消关注
    async unsubscribe(user_id) {
      this.isSubscribeLoading = true
      try {
        const { code } = await unsubscribe({ user_id })
        if (code === 2000) {
          this.isFollowed = false
        }
      } finally {
        this.isSubscribeLoading = false
      }
    },

    // 联系卖家
    async contactSeller() {
      if (!this.$login()) return

      const { _id, nickname } = this.seller
      const code = await this.$store.dispatch('chat/addContact', _id)
      if (code !== 2000) return

      this.$store.commit('chat/SET_ACTIVE_CHAT_USER', { _id, nickname })
      this.$store.commit('chat/SET_CHAT_OPEN')
    },

    async isUserFollowed(user_id) {
      if (!this.$login()) return

      const { code, data } = await isUserFollowed({ user_id })
      if (code === 2000) {
        this.isFollowed = data.is_followed
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// 按钮闪光闪烁
.hover-light {
  position: relative;
  .light {
    position: absolute;
    display: none;
    top: 0;
    left: -150px;
    width: 150px;
    height: 100%;
    background-image: -moz-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-image: -webkit-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    transform: skewX(-25deg);
  }
  &:hover {
    .light {
      display: block;
      animation: flash 0.45s;
    }
    @keyframes flash {
      from {
        left: -150px;
      }
      to {
        left: 100%;
      }
    }
  }
}
</style>
