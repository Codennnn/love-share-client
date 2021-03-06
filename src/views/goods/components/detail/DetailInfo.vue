<template>
  <div>
    <div class="relative mb-6 p-6 bg-white radius overflow-hidden">
      <div class="flex">
        <div style="width: 60%;">
          <el-carousel :autoplay="false">
            <el-carousel-item
              style="display: flex; justify-content: center;"
              v-for="(url, i) in goods.img_list"
              :key="i"
            >
              <el-image
                class="w-full"
                fit="contain"
                :src="url"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
          <vs-images hover="zoom">
            <vs-image
              v-for="(url, i) in goods.img_list"
              :key="i"
              :src="`${url}?imageView2/2/w/100`"
              @click.native="showViewer = true, viewerList = [url]"
            />
          </vs-images>
        </div>
        <div
          class="pl-5"
          style="width: 40%;"
        >
          <p class="text-lg font-semibold">{{ goods.name }}</p>
          <div class="my-2 text-gray-500 text-sm">
            <p>发布于 {{ $timeDiff(goods.created_at) }}，已被浏览<span class="mx-1">{{ goods.views }}</span>次</p>

            <div class="mt-2 flex items-center justify-end">
              <div
                v-if="goods.can_bargain"
                class="mr-auto py-1 px-3 bg-gray-250 primary rounded-lg"
              >可议价</div>
              <span class="mr-2 text-sm text-gray-600">{{ goods.collect_num }} 人收藏</span>
              <div
                class="collect-btn flex items-center"
                :class="isCollected ? 'is-collected' : 'not-collected'"
                @click="isCollected ? deleteCollection() : addCollection()"
              >
                <feather
                  class="mr-1"
                  size="18"
                  type="star"
                ></feather>
                {{ isCollected ? '已收藏' : '收藏' }}
              </div>
            </div>
          </div>
          <vs-divider border-style="dashed" />
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
                ￥{{ $numFixed(goods.price) }}
              </span>
              <span
                v-if="goods.original_price !== 0"
                class="text-gray-500"
                style="text-decoration: line-through;"
              >
                ￥{{ $numFixed(goods.original_price) }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <vs-chip>新 旧</vs-chip>
            <span
              class="font-bold"
              style="margin-bottom: 2px;"
              :class="{
              'text-success': goods.degree > 70,
              'text-warning': goods.degree >= 30 && goods.degree < 70,
              'text-danger': goods.degree < 30,
            } "
            >
              {{ goods.degree }}%
            </span>
          </div>
          <div class="info-item">
            <vs-chip>数 量</vs-chip>
            <span style="margin-bottom: 2px;">{{ goods.quantity }}</span>
          </div>
          <div class="info-item">
            <vs-chip>配 送</vs-chip>
            <span style="margin-bottom: 4px; font-size: 15px;">
              {{ goods.delivery === '1' ? '包邮' : goods.delivery === '2' ? '自费' : '自提' }}
            </span>
            <span
              v-if="goods.delivery === '2'"
              style="margin-bottom: 4px; font-size: 15px;"
            >
              (￥{{ $numFixed(goods.delivery_charge) }})
            </span>
          </div>
          <div
            class="info-item"
            v-if="!goods.returnable"
          >
            <vs-chip>保 障</vs-chip>
            <span style="margin-bottom: 4px; font-size: 15px;">
              7天无理由退换货
            </span>
          </div>
          <vs-divider border-style="dashed" />
          <div class="flex items-center mt-6">
            <vs-input-number
              class="mr-4"
              v-model="amount"
              :min="1"
              :max="goods.quantity"
            />
            <div
              v-if="goods.status === 1 && !$self(sellerId)"
              class="btn-group"
            >
              <vs-button
                id="addCartBtn"
                class="btnx text-sm vs-con-loading__container"
                :disabled="addCartDisable"
                @click="$emit('settle')"
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
                    在购物车中查看
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <div v-else-if="goods.status === 2 || goods.status === 4">
              <vs-button
                size="small"
                :disabled="true"
              >该商品已被购买</vs-button>
            </div>
            <div v-else-if="goods.status === 3">
              <vs-button
                color="danger"
                size="small"
                :disabled="true"
              >该商品已下架</vs-button>
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

      <!-- 图片预览 -->
      <el-image-viewer
        v-show="showViewer"
        :on-close="() => { showViewer = false }"
        :url-list="viewerList"
      />
    </div>

    <div
      v-if="goods.review"
      class="p-6 bg-white radius"
    >
      <div class="mb-3">
        <span class="mr-1 text-xl font-bold">买家评价</span>
        <span class="text-sm text-gray-600">
          用户购买
          {{ $dayjs(goods.review.created_at).diff($dayjs(goods.sell_time), 'day') }}
          天后评价
        </span>
      </div>

      <el-rate
        class="mb-4"
        disabled
        v-model="goods.review.star"
      >
      </el-rate>
      <div class="w-1/2 py-3 px-5 radius bg-gray-150 text-gray-600">{{ goods.review.content || '未填写' }}</div>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'

import { addCollection, deleteCollection } from '@/request/api/user'
import { isGoodsCollected } from '@/request/api/goods'

export default {
  name: 'DetailInfo',
  components: { ElImageViewer },
  props: { goods: Object, goodsId: String, sellerId: String },

  data: () => ({
    showViewer: false,
    addCartDisable: false, // 禁止加入购物车
    viewerList: [],

    amount: 1, // 购买的数量
    isCollected: false,
  }),

  watch: {
    amount(v) {
      this.$emit('setAmount', v)
    },
  },

  computed: {
    isInCart() {
      return id => this.$store.getters['cart/isInCart'](id)
    },
  },

  activated() {
    this.isGoodsCollected(this.goodsId)
  },

  deactivated() {
    this.showViewer = false
  },

  methods: {
    // 加入购物车
    addCartItem(id) {
      this.$loading(
        async () => {
          this.addCartDisable = true

          if (this.amount >= 1 && this.amount <= this.goods.quantity) {
            await this.$store.dispatch(
              'cart/addCartItem',
              { amount: this.amount, goods_id: id, seller: this.sellerId },
            )
          }
        },
        {
          background: 'primary',
          color: '#fff',
          container: '#addCartBtn',
          scale: 0.45,
        },
        () => { this.addCartDisable = false },
      )
    },

    // 收藏商品
    async addCollection() {
      const { code } = await addCollection({ goods_id: this.goodsId })
      if (code === 2000) {
        this.isGoodsCollected(this.goodsId)
      }
    },

    // 取消收藏商品
    async deleteCollection() {
      const { code } = await deleteCollection({ goods_id: this.goodsId })
      if (code === 2000) {
        this.isGoodsCollected(this.goodsId)
      }
    },

    async isGoodsCollected(goods_id) {
      if (!this.$login()) return

      const { code, data } = await isGoodsCollected({ goods_id })
      if (code === 2000) {
        this.isCollected = data.is_collected
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

.collect-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
  &.is-collected {
    color: $warning;
    background: rgba(var(--vs-warning), 0.1);
  }
  &.not-collected {
    color: $success;
    background: rgba(var(--vs-success), 0.1);
  }
}
</style>
