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
                  :src="image"
                  @click.native="showViewer = true"
                />
              </vs-images>
            </div>
            <div class="w-1/2 px-5">
              <p class="text-lg font-semibold">{{ goods.name }}</p>
              <div class="my-2 flex items-center text-gray-500 text-sm">
                <p>发布于 {{ timeDiff(goods.time) }}</p>
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
                  style="margin: 0 5px 4px 0; font-size: 15px;"
                  v-for="(item, i) in goods.category"
                  :key="i"
                >
                  {{ item }}
                </span>
              </div>
              <div class="info-item">
                <vs-chip>价 格</vs-chip>
                <div>
                  <span class="text-2xl text-primary font-semibold">
                    ￥{{ goods.price || '--' }}
                  </span>
                  <span
                    class="text-gray-500"
                    style="text-decoration: line-through;"
                  >
                    ￥{{ goods.original_price }}
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
                  class="ml-3 text-sm"
                  color="danger"
                  v-if="isInCart(goods.goods_id)"
                  @click="$store.dispatch('cart/removeCartItem', goods.goods_id)"
                >移出购物车</vs-button>
                <vs-button
                  class="ml-3 text-sm"
                  v-else
                  @click="addCartItem()"
                >加入购物车</vs-button>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-gray-600">商品详细介绍</p>
            <div
              class="mt-2 text-sm"
              v-html="goods.description"
            ></div>
          </div>

          <!-- 下架标志 -->
          <div
            class="absolute z-50 cursor-default"
            style="transform: rotateZ(-45deg);top: 1.5rem; left: -3.5rem;"
            v-if="isDismount"
          >
            <div class="w-48 py-1 text-center text-white text-xl bg-danger">已下架</div>
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
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
            @click="viewUserDetail(seller.user_id)"
          />
          <div
            class="flex justify-center items-center text-lg cursor-pointer"
            @click="viewUserDetail(seller.user_id)"
          >
            <span>{{ seller.nickname }}</span>
            <i
              class="el-icon-male ml-1"
              style="color: rgb(31, 116, 255);"
              v-if="seller.gender === 1"
            ></i>
            <i
              class="el-icon-female ml-1 text-red-500"
              v-else-if="seller.gender === 0"
            ></i>
          </div>
          <div class="my-1 text-sm text-gray-500">
            {{ seller.school }}
          </div>
          <div class="flex justify-center overflow-hidden">
            <span
              class="px-5 py-2 flex items-center justify-center text-white
              text-sm bg-primary cursor-pointer"
              style="height: 34px; border-radius: 17px;"
              color="primary"
              @click="isSubscribe ? unsubscribe() : subscribe()"
            >
              <i
                class="el-icon-loading mr-1"
                v-if="isSubscribeLoading"
              ></i>
              {{ isSubscribe ? '取消关注' : '加关注' }}
            </span>
          </div>
          <div class="flex justify-around mt-3">
            <div>
              <div class="font-semibold">{{ seller.published_num || '0' }}</div>
              <div class="text-gray-600 text-sm">已发布</div>
            </div>
            <div>
              <div class="font-semibold">{{ seller.published_num || '0' }}</div>
              <div class="text-gray-600 text-sm">已获赞</div>
            </div>
            <div>
              <div class="font-semibold">{{ seller.follower_num || '0' }}</div>
              <div class="text-gray-600 text-sm">关注者</div>
            </div>
          </div>
        </div>
        <div class="hover-light cursor-pointer">
          <div class="mt-5 p-2 flex justify-center items-center text-center text-white
          bg-primary-gradient rounded">
            联系卖家
          </div>
          <div class="light"></div>
        </div>
      </vs-col>
    </vs-row>

    <vs-popup
      title="已加入购物车"
      :active.sync="popupActive"
    >
      <p>该商品已加入您的购物车, 是否结算付款?</p>
      <div class="mt-4 flex justify-end">
        <vs-button
          class="mr-4"
          color="#a4a4a4"
          type="border"
          @click="popupActive = false"
        >暂不结算</vs-button>
        <vs-button
          type="relief"
          @click="onSettle()"
        >立即结算</vs-button>
      </div>
    </vs-popup>

    <el-image-viewer
      v-show="showViewer"
      :on-close="showViewer = false"
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
  data: () => ({
    timeDiff,
    showViewer: false,
    goods: {}, // 商品信息
    seller: {}, // 卖家信息
    amount: 1, // 购买的数量
    popupActive: false,
    isPopupActive: false,
    isCollect: false,
    isDismount: false,
    isSubscribe: false,
    isSubscribeLoading: false,
  }),

  components: { ElImageViewer },

  created() {
    this.getGoodsDetail()
  },

  mounted() {
    console.log('商品 ID', this.$route.query.id)
  },

  computed: {
    isInCart() {
      return id => this.$store.getters['cart/isInCart'](id)
    },
  },

  methods: {
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail()
      if (code === 2000) {
        this.goods = data.goods_detail
        this.seller = data.seller_info
      }
    },

    // 查看用户详情
    viewUserDetail(id) {
      this.$router.push({
        path: '/user-detail',
        query: { id },
      })
    },

    // 加入购物车
    addCartItem() {
      if (!this.isInCart(this.goods.goods_id)) {
        this.popupActive = true
        this.goods.seller_info = this.seller_info
        this.goods.amount = this.amount
        const item = this.goods
        this.$store.dispatch('cart/addCartItem', item)
      }
    },

    // 关注
    async subscribe() {
      this.isSubscribeLoading = true
      try {
        const { code } = await subscribe()
        if (code === 2000) {
          this.isSubscribe = true
        }
      } finally {
        this.isSubscribeLoading = false
      }
    },

    // 取消关注
    async unsubscribe() {
      this.isSubscribeLoading = true
      try {
        const { code } = await unsubscribe()
        if (code === 2000) {
          this.isSubscribe = false
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
      setTimeout(() => {
        this.$router.push({ path: '/goods-cart' })
      }, 0)
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
</style>
