<template>
  <div class="flex mt-8">
    <div class="w-2/3 pr-2">
      <div>
        <ul>
          <li
            class="list-item"
            v-for="(item, i) in cartList"
            :key="i"
          >
            <div class="w-1/3">
              <el-image
                class="h-full"
                fit="cover"
                :src="item.img_list[0]"
              />
            </div>

            <div
              class="py-4 px-5 flex-col"
              style="border-right: 1px dashed #cfcfcf;"
            >
              <div class="text-sm">{{ item.name }}</div>
              <div class="text-sm font-bold">数量</div>
              <div class="flex">
                <vs-input-number
                  :max="item.num"
                  v-model="number"
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
              >
                <i class="el-icon-close mr-1 text-lg"></i>
                移出购物车
              </div>
              <div
                class="btn text-white"
                style="background: rgba(var(--vs-primary), 1);"
              >
                <i class="el-icon-wallet mr-2 text-lg"></i>
                结算付款
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
        <div class="flex justify-between">
          <span class="label">优惠券</span>
          <span>选择</span>
        </div>
        <vs-divider />
        <div>
          <span class="label">价格详细</span>
        </div>
        <div class="item">
          <span class="item-label">总价</span>
          <span class="item-value">￥{{ '' }}</span>
        </div>
        <div class="item">
          <span class="item-label">折扣</span>
          <span class="item-value">￥{{ '' }}</span>
        </div>
        <div class="item">
          <span class="item-label">运费</span>
          <span class="item-value">￥{{ '0.00' }}</span>
        </div>
        <vs-divider />
        <div class="flex justify-between">
          <span class="label">实付</span>
          <span>￥{{ '50.50' }}</span>
        </div>
        <vs-button class="w-full">去结算</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart-list',
  data: () => ({
    cartList: [],
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

  methods: {
    async getCartList() {
      await this.$store.dispatch('cart/getCartList')
      this.cartList = this.$store.getters['cart/carts']
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
