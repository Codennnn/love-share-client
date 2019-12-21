<template>
  <div>
    <div class="p-3 text-center bg-white shadow-lg rounded-lg">
      <vs-avatar
        size="90px"
        :src="`${seller.avatar_url}?imageView2/2/w/100`"
        @click="viewUserDetail(seller._id)"
      />
      <div
        class="flex justify-center items-center text-lg cursor-pointer"
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
          :class="isFollowed(seller._id)
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-primary text-white'"
          @click="isFollowed(seller._id) ? unsubscribe(seller._id) : subscribe(seller._id)"
        >
          <i
            class="el-icon-loading mr-1"
            v-if="isSubscribeLoading"
          ></i>
          {{ isFollowed(seller._id) ? '已关注' : '加关注' }}
        </span>
      </div>
      <div class="flex justify-around mt-3">
        <div>
          <div class="font-semibold">{{ seller.published_goods.length }}</div>
          <div class="text-gray-600 text-sm">已发布</div>
        </div>
        <div>
          <div class="font-semibold">{{ seller.fans.length }}</div>
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
      class="hover-light cursor-pointer"
    >
      <div
        class="mt-5 p-2 flex justify-center items-center text-center text-white
          bg-primary-gradient rounded"
        @click="contactSeller()"
      >
        联系卖家
      </div>
      <div class="light"></div>
    </div>
  </div>
</template>

<script>
import { getGoodsSeller } from '@/request/api/goods'

export default {
  name: 'DetailUser',
  props: {
    goodsId: String,
  },

  data: () => ({
    seller: { // 卖家信息
      avatar_url: '',
      nickname: '----',
      school: { name: '-----' },
      gender: '',
      credit_value: 0,
      fans: [],
      published_goods: [],
    },
    isSubscribe: false,
    isSubscribeLoading: false,
  }),

  watch: {
    goodsId(v) {
      if (v.length > 0) {
        this.getGoodsSeller()
      }
    },
  },

  computed: {
    isFollowed() {
      return id => this.$store.getters['user/isFollowed'](id)
    },
  },

  methods: {
    async getGoodsSeller() {
      const { code, data } = await getGoodsSeller({ goods_id: this.goodsId })
      if (code === 2000) {
        this.seller = data.seller
      }
    },

    // 查看用户详情
    viewUserDetail(user_id) {
      this.$router.push({
        path: '/user-detail',
        query: { user_id },
      })
    },

    // 联系卖家
    async contactSeller() {
      const { _id, nickname, avatar_url } = this.seller
      if (!this.$store.getters['chat/isInChat'](_id)) {
        this.$store.dispatch('chat/addContact', { _id, nickname, avatar_url })
      }
      this.$store.commit('chat/SET_ACTIVE_CHAT_USER', { _id, nickname, avatar_url })
      this.$store.commit('chat/SET_CHAT_OPEN')
    },
  },
}
</script>

<style lang="scss" scoped>
// 按钮闪光闪烁
.hover-light {
  position: relative;
  overflow: hidden;
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
  &:hover .light {
    display: block;
    animation: flash 0.3s;
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
</style>
