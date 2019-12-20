<template>
  <div class="relative p-6 bg-white rounded-lg overflow-hidden">
    <div class="flex">
      <div style="width: 60%;">
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
      <div
        class="pl-5"
        style="width: 40%;"
      >
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
          <div class="btn-group">
            <vs-button
              id="addCartBtn"
              class="btnx ml-3 text-sm vs-con-loading__container"
              :disabled="addCartDisable"
            >立即购买</vs-button>
            <vs-dropdown>
              <vs-button
                class="btn-drop"
                icon="expand_more"
              ></vs-button>

              <vs-dropdown-menu>
                <vs-dropdown-item
                  v-if="!isInCart(goods._id)"
                  @click="addCartItem(goods._id)"
                >
                  加入购物车
                </vs-dropdown-item>
                <vs-dropdown-item
                  v-else
                  @click="$router.push('/goods-cart')"
                >
                  已加入购物车
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
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
  collectGoods,
  uncollectGoods,
} from '@/request/api/goods'

export default {
  name: 'DetailInfo',
  components: { ElImageViewer },

  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    timeDiff,
    showViewer: false,
    addCartDisable: false,

    amount: 1, // 购买的数量
    isCollect: false,
  }),

  computed: {
    isInCart() {
      return id => this.$store.getters['cart/isInCart'](id)
    },
  },

  methods: {
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

.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    height: 38px;
    line-height: 38px;
    margin: 0px !important;
    &.btnx {
      padding: 0 15px;
      margin-left: 10px !important;
      border-radius: 5px 0px 0px 5px;
    }
    &.btn-drop {
      font-size: 16px;
      border-radius: 0px 5px 5px 0px;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
