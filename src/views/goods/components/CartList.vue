<template>
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
            数量
            <div class="flex">
              <vs-input-number v-model="item.num" />
            </div>
          </div>

          <div class="py-4 px-5">
            <div class="text-right">
              <vs-chip :color="{primary: item.delivery === 1}">
                {{ delivery[item.delivery] }}
              </vs-chip>
            </div>
            <div class="w-full my-4 text-center font-bold">￥{{ item.price }}</div>
            <div
              class="btn mb-2"
              style="background: rgb(244, 244, 244);"
            >
              <i class="el-icon-close mr-1 text-lg"></i>
              移除
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
</template>

<script>
export default {
  name: 'cart-list',
  data: () => ({
    cartList: [],
    number: 1,
    delivery: {
      1: '包邮',
      2: '自费',
      3: '自提',
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
  width: 8rem;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
