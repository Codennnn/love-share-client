<template>
  <div>
    <vs-row>
      <vs-col
        class="pr-3"
        vs-w="9"
      >
        <div class="relative p-6 bg-white rounded-lg overflow-hidden">
          <div class="flex">
            <div class="w-1/2 ">
              <el-carousel :autoplay="false">
                <el-carousel-item
                  v-for="(image, i) in goods.img_list"
                  :key="i"
                >
                  <img
                    class="h-full"
                    style="max-width: inherit;"
                    :src="image"
                  >
                </el-carousel-item>
              </el-carousel>
              <vs-images hover="zoom">
                <vs-image
                  class=""
                  v-for="(image, i) in goods.img_list"
                  :key="i"
                  :src="`${image}?imageView2/2/w/100`"
                  @click.native="showViewer = true"
                />
              </vs-images>
            </div>
            <div class="w-1/2 px-5">
              <p class="text-lg font-semibold">{{ goods.name }}</p>
              <div class="my-2 flex items-center text-gray-500 text-sm">
                <p>发布于 {{ timeDiff(goods.created_at) }}</p>
                <vs-button
                  class="ml-6"
                  type="flat"
                  size="small"
                  icon-pack="el-icon"
                  icon="el-icon-star-off"
                  :color="isCollect ? 'warning' : 'success'"
                  @click="isCollect ? uncollectGoods() : collectGoods()"
                >
                  {{ isCollect ? '取消收藏' : '加入收藏' }}
                </vs-button>
              </div>
              <div class="info-item">
                <vs-chip>类 别</vs-chip>
                <span
                  class="text-gray-600"
                  style="margin: 0 5px 4px 0; font-size: 15px;"
                  v-for="(item, i) in goods.category"
                  :key="i"
                >
                  {{ item.name }}
                </span>
              </div>
              <div class="info-item">
                <vs-chip>价 格</vs-chip>
                <div>
                  <span class="text-2xl text-primary font-semibold">
                    ￥{{ Number(goods.price).toFixed(2) }}
                  </span>
                  <span
                    v-if="goods.original_price !== 0"
                    class="text-gray-500"
                    style="text-decoration: line-through;"
                  >
                    ￥{{ Number(goods.original_price).toFixed(2) }}
                  </span>
                </div>
              </div>
              <div class="info-item">
                <vs-chip>数 量</vs-chip>
                <span style="margin-bottom: 2px;">{{ goods.quantity }}</span>
              </div>
              <div class="info-item">
                <vs-chip>配 送</vs-chip>
                <span style="margin-bottom: 4px;font-size: 15px;">
                  {{ goods.delivery === '1' ? '包邮' : goods.delivery === '2' ? '自费' : '自提' }}
                </span>
              </div>
              <div
                class="info-item"
                v-if="goods.returnable"
              >
                <vs-chip>保 障</vs-chip>
                <span style="margin-bottom: 4px; font-size: 15px;">
                  7天无理由退换货
                </span>
              </div>
              <div class="flex items-center mt-6">
                <vs-input-number
                  v-model="amount"
                  :min="1"
                  :max="goods.quantity"
                />
                <vs-button
                  v-if="!isInCart(goods._id)"
                  id="addCartBtn"
                  class="ml-3 text-sm vs-con-loading__container"
                  :disabled="addCartDisable"
                  @click="addCartItem(goods._id)"
                >加入购物车</vs-button>
                <vs-button
                  v-else
                  class="ml-3 text-sm"
                  color="success"
                  @click="$router.push('/goods-cart')"
                >已加入购物车，立即结算</vs-button>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-gray-600">商品详细介绍</p>
            <div
              class="mt-2 text-sm goods-desc"
              v-html="goods.description"
            ></div>
          </div>
        </div>
      </vs-col>

      <!-- 卖家信息 -->
      <vs-col
        class="pl-3"
        vs-w="3"
      >
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
        <div class="hover-light cursor-pointer">
          <div
            class="mt-5 p-2 flex justify-center items-center text-center text-white
          bg-primary-gradient rounded"
            @click="contactSeller()"
          >
            联系卖家
          </div>
          <div class="light"></div>
        </div>
      </vs-col>
    </vs-row>

    <el-image-viewer
      v-show="showViewer"
      :on-close="() => { showViewer = false }"
      :url-list="goods.img_list"
    />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'

import { timeDiff } from '@/utils/util'
import { subscribe, unsubscribe } from '@/request/api/user'
import {
  getGoodsDetail,
  collectGoods,
  uncollectGoods,
} from '@/request/api/goods'

export default {
  name: 'GoodsDetail',
  components: { ElImageViewer },

  data: () => ({
    timeDiff,
    showViewer: false,
    addCartDisable: false,

    goods: {}, // 商品信息
    seller: { // 卖家信息
      avatar_url: '',
      nickname: '----',
      school: { name: '-----' },
      gender: '',
      credit_value: 0,
      fans: [],
      published_goods: [],
    },

    amount: 1, // 购买的数量
    isCollect: false,
    isSubscribe: false,
    isSubscribeLoading: false,
  }),

  computed: {
    isInCart() {
      return id => this.$store.getters['cart/isInCart'](id)
    },

    isFollowed() {
      return id => this.$store.getters['user/isFollowed'](id)
    },
  },

  watch: {
    '$route.query': {
      handler(query) {
        this.initValues(query.goods_id)
      },
      immediate: true,
    },
  },

  methods: {
    async initValues(goods_id) {
      const { code, data: { goods_detail } } = await getGoodsDetail({ goods_id })
      if (code === 2000) {
        this.goods = goods_detail
        this.seller = goods_detail.seller
      }
    },

    // 查看用户详情
    viewUserDetail(user_id) {
      this.$router.push({
        path: '/user-detail',
        query: { user_id },
      })
    },

    // 加入购物车
    async addCartItem(id) {
      // 显示登录按钮的加载动画
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#addCartBtn',
        scale: 0.45,
      })
      this.addCartDisable = true

      try {
        if (this.amount >= 1 && this.amount <= this.goods.quantity) {
          await this.$store.dispatch('cart/addCartItem', { amount: this.amount, goods_id: id })
        }
      } finally {
        this.$vs.loading.close('#addCartBtn > .con-vs-loading')
        this.addCartDisable = false
      }
    },

    // 关注
    async subscribe(user_id) {
      this.isSubscribeLoading = true
      try {
        const { code } = await subscribe({ user_id })
        if (code === 2000) {
          this.isSubscribe = true
          this.$store.commit('user/ADD_FOLLOW', user_id)
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
          this.isSubscribe = false
          this.$store.commit('user/REMOVE_FOLLOW', user_id)
        }
      } finally {
        this.isSubscribeLoading = false
      }
    },

    // 收藏商品
    async collectGoods() {
      const { code } = await collectGoods()
      if (code === 2000) {
        this.isCollect = true
      }
    },

    // 取消收藏商品
    async uncollectGoods() {
      const { code } = await uncollectGoods()
      if (code === 2000) {
        this.isCollect = false
      }
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

    // 结算
    onSettle() {
      this.popupActive = false
      this.$router.push({ path: '/goods-cart' })
    },
  },
}
</script>

<style lang="scss" scoped>
.info-item {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  cursor: default;
  .con-vs-chip {
    margin-right: 0.5rem;
  }
}

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

.goods-desc::v-deep {
  h1 {
    font-size: 2em !important;
    margin: 0.67em 0 !important;
  }

  h2 {
    font-size: 1.5em;
    margin: 0.75em 0 !important;
  }

  h3 {
    font-size: 1.17em;
    margin: 0.83em 0 !important;
  }

  h5 {
    font-size: 0.83em;
    margin: 1.5em 0 !important;
  }

  h6 {
    font-size: 0.75em;
    margin: 1.67em 0 !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  b,
  strong {
    font-weight: bolder !important;
  }
}
</style>
