<template>
  <div v-if="cartList.length > 0">
    <div class="flex">
      <!-- 左侧 -->
      <div class="w-2/3 pr-2">
        <div>
          <ul>
            <li
              class="list-item vs-con-loading__container"
              v-for="it in cartList"
              :key="it._id"
              :id="`li-loading${it._id}`"
            >
              <div class="w-1/3">
                <el-image
                  class="h-full w-full"
                  fit="contain"
                  :src="`${it.goods.img_list[0]}?imageView2/2/w/250`"
                />
              </div>
              <div
                class="w-1/3 py-4 px-5 flex-col"
                style="border-right: 1px dashed #cfcfcf;"
              >
                <div class="font-bold text-gray-700">{{ it.goods.name }}</div>
                <div class="text-sm">数量</div>
                <div class="flex">
                  <vs-input-number
                    :min="1"
                    :max="it.goods.quantity"
                    v-model="it.amount"
                  />
                </div>
              </div>
              <div class="w-1/3 py-4 px-5 flex flex-col items-center">
                <div class="ml-auto">
                  <vs-chip :color="it.goods.delivery === 1 ? 'primary' : ''">
                    {{ delivery[it.goods.delivery] }}
                  </vs-chip>
                </div>
                <div class="w-full mt-2 mb-4 text-center">
                  <span class="text-sm text-gray-600">单价：</span>
                  <span class="text-lg font-bold">￥{{ $numFixed(it.goods.price) }}</span>
                </div>
                <div
                  class="btn mb-2"
                  style="background: rgb(244, 244, 244);"
                  @click="removeCartItem(it._id)"
                >
                  <i class="el-icon-close mr-1 text-xl"></i>
                  移出购物车
                </div>
                <div
                  class="btn text-white"
                  style="background: rgba(var(--vs-primary), 1);"
                  @click="$router.push({path: '/goods-detail', query: { goodsId: it.goods._id }})"
                >
                  <i class="el-icon-star-off mr-1 text-lg"></i>
                  查看商品
                </div>
              </div>

              <!-- 已出售标志 -->
              <div
                v-if="it.goods.status !== 1"
                class="absolute z-50 cursor-default"
                style="transform: rotateZ(-45deg);top: 1.5rem; left: -3.5rem;"
              >
                <div class="w-48 py-1 text-center text-white text-xl bg-danger">已卖出</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="w-1/3 pl-5">
        <div class="p-4 bg-white light-shadow radius">
          <p class="mb-1 text-sm text-gray-500">购物车账单总览</p>
          <div class="flex justify-between cursor-pointer">
            <span class="label">优惠券</span>
            <span>{{ true ? '无' : '未选择' }}</span>
          </div>
          <vs-divider />
          <div>
            <span class="label">价格详细</span>
          </div>
          <div class="item">
            <span class="item-label">总价</span>
            <span class="item-value">￥{{ $numFixed(amountPayable) }}</span>
          </div>
          <div class="item">
            <span class="item-label">折扣</span>
            <span class="item-value">无</span>
          </div>
          <div class="item">
            <span class="item-label">运费</span>
            <span class="item-value">
              {{
                typeof tweenedDelivery === 'number'
                  ? $numFixed(tweenedDelivery)
                  : tweenedDelivery
              }}
            </span>
          </div>
          <vs-divider />
          <div class="flex justify-between">
            <span class="label">实付</span>
            <span class="label text-lg">
              ￥{{ $numFixed(tweenedAmount) }}
            </span>
          </div>
          <vs-button
            class="w-full mt-4 mb-2"
            @click="onSettle()"
          >开始结算</vs-button>
          <el-popover>
            <p class="text-gray-600">购物车清空后将不可恢复</p>
            <div class="flex justify-end">
              <vs-button
                color="danger"
                type="flat"
                size="small"
                @click="onClear()"
              >确认清空</vs-button>
            </div>
            <span
              slot="reference"
              class="ml-1 text-gray-500 text-sm text-right cursor-pointer"
            >清空购物车</span>
          </el-popover>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="p-8 radius bg-white light-shadow"
  >
    <p class="mb-5 text-xl font-bold">您的购物车里一件宝贝也有没哎~</p>
    <vs-button
      class="text-sm"
      @click="$router.push('/')"
    >去商城逛一逛</vs-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TweenLite } from 'gsap'

export default {
  name: 'CartList',
  data: () => ({
    delivery: {
      1: '包 邮',
      2: '自 费',
      3: '自 提',
    },
    tweenedDelivery: 0,
    tweenedAmount: 0,
  }),

  computed: {
    // 购物车列表
    ...mapState('cart', ['cartList']),
    // 运费、总价
    ...mapGetters('cart', ['deliveryCharges', 'amountPayable']),
  },

  watch: {
    deliveryCharges: {
      handler(newValue) {
        TweenLite.to(this.$data, 0.8, { tweenedDelivery: newValue })
      },
      immediate: true,
    },
    amountPayable: {
      handler(newValue) {
        TweenLite.to(this.$data, 0.8, { tweenedAmount: newValue })
      },
      immediate: true,
    },
  },

  methods: {
    // 移出购物车
    async removeCartItem(id) {
      this.$vs.loading({
        container: `#li-loading${id}`,
        scale: 1,
      })

      try {
        await this.$store.dispatch('cart/removeCartItem', id)
      } finally {
        this.$vs.loading.close(`#li-loading${id} > .con-vs-loading`)
      }
    },

    // 清空购物车
    onClear() {
      this.$store.dispatch('cart/clearCartList')
    },

    // 开始结算
    onSettle() {
      this.$emit('switchComponent', {
        currentStep: 2,
        currentComponent: 'CartAddress',
        isActive: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  background: white;
  border-radius: $large-radius;
  transition: 0.4s;
  box-shadow: $light-shadow;
  &:hover {
    transform: translateY(-6px);
  }
}

.btn {
  width: 95%;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  cursor: pointer;
  @media (max-width: 1600px) {
    width: 85%;
  }
}

.label {
  font-weight: 600;
  color: #646464;
}

.item {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  .item-label {
    color: rgb(160, 174, 192);
  }
  .item-value {
    color: rgb(113, 128, 150);
  }
}
</style>
