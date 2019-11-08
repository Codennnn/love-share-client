<template>
  <div v-if="cartList.length > 0">
    <div class="flex">
      <div class="w-2/3 pr-2">
        <div>
          <ul>
            <li
              class="list-item vs-con-loading__container mb-6"
              v-for="item in cartList"
              :key="item.goods_id"
              :id="`li-loading${item.goods_id}`"
            >
              <div class="w-1/3">
                <el-image
                  class="h-full"
                  fit="cover"
                  :src="item.img_list[0]"
                />
              </div>

              <div
                class="w-1/3 py-4 px-5 flex-col"
                style="border-right: 1px dashed #cfcfcf;"
              >
                <div class="text-sm">{{ item.name }}</div>
                <div class="text-sm font-bold">数量</div>
                <div class="flex">
                  <vs-input-number
                    :max="item.num"
                    v-model="item.num"
                  />
                </div>
              </div>

              <div class="w-1/3 py-4 px-5 flex flex-col items-center">
                <div class="ml-auto">
                  <vs-chip :color="item.delivery === 1 ? 'primary' : ''">
                    {{ delivery[item.delivery] }}
                  </vs-chip>
                </div>
                <div class="w-full mt-2 mb-4 text-center font-bold">￥{{ item.price }}</div>
                <div
                  class="btn mb-2"
                  style="background: rgb(244, 244, 244);"
                  @click="removeCartItem(item.goods_id)"
                >
                  <i class="el-icon-close mr-1 text-xl"></i>
                  移出购物车
                </div>
                <div
                  class="btn text-white"
                  style="background: rgba(var(--vs-primary), 1);"
                  @click="item.is_collected
                  ? uncollectGoods(item.goods_id)
                  : collectGoods(item.goods_id)"
                >
                  <i class="el-icon-star-off mr-1 text-lg"></i>
                  {{ item.is_collected ? '取消收藏' : '添加到收藏' }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-1/3 pl-4">
        <div
          class="p-4 bg-white rounded-lg"
          style="box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);"
        >
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
            <span class="item-value">￥{{ actuallyPaid.toFixed(2) }}</span>
          </div>
          <div class="item">
            <span class="item-label">折扣</span>
            <span class="item-value">无</span>
          </div>
          <div class="item">
            <span class="item-label">运费</span>
            <span class="item-value">无</span>
          </div>
          <vs-divider />
          <div class="flex justify-between">
            <span class="label">实付</span>
            <span class="label">￥{{ actuallyPaid.toFixed(2) }}</span>
          </div>
          <vs-button
            class="w-full mt-4"
            @click="onSettle()"
          >开始结算</vs-button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="p-5 rounded-lg bg-white"
    style="box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);"
  >
    <p class="mb-4 text-xl font-bold">您的购物车一件宝贝也有没哎~</p>
    <vs-button
      class="text-sm"
      @click="$router.push('/goods-vivid-list')"
    >去商城逛一逛</vs-button>
  </div>
</template>

<script>
import { collectGoods, uncollectGoods } from '@/request/api/goods'

export default {
  name: 'CartList',
  data: () => ({
    number: 1,
    delivery: {
      1: '包 邮',
      2: '自 费',
      3: '自 提',
    },
  }),

  mounted() {
    this.getCartList()
  },

  computed: {
    cartList() {
      return this.$store.getters['cart/carts']
    },

    actuallyPaid() {
      return this.cartList.reduce((acc, curr) => acc + curr.price, 0)
    },
  },

  methods: {
    async getCartList() {
      await this.$store.dispatch('cart/getCartList')
    },

    // 移出购物车
    async removeCartItem(id) {
      this.$vs.loading({
        container: `#li-loading${id}`,
        scale: 1,
      })
      await this.$store.dispatch('cart/removeCartItem', id)
      this.$nextTick(() => {
        this.$vs.loading.close(`#li-loading${id} > .con-vs-loading`)
      })
    },

    // 收藏商品
    async collectGoods(id) {
      try {
        const { code } = await collectGoods()
        if (code === 2000) {
          this.cartList.forEach((el, i, _) => {
            if (el.goods_id === id) {
              _[i].is_collected = true
            }
          })
        }
      } catch {
        // TODO
      }
    },

    // 取消收藏商品
    async uncollectGoods(id) {
      try {
        const { code } = await uncollectGoods()
        if (code === 2000) {
          this.cartList.forEach((el, i, _) => {
            if (el.goods_id === id) {
              _[i].is_collected = false
            }
          })
        }
      } catch {
        // TODO
      }
    },

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
  display: flex;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  transition: 0.4s;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
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
