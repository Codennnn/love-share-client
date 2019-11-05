<template>
  <div class="w-2/3 pr-2">
    <div>
      <ul>
        <li
          class="p-3 pl-0 bg-white"
          v-for="(item, i) in cartList"
          :key="i"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart-list',
  data: () => ({
    cartList: [],
  }),

  mounted() {
    this.getCartList()
  },

  methods: {
    async getCartList() {
      await this.$store.dispatch('cart/getCartList')
      console.log(this.$store.getters['cart/carts'])
      this.cartList = this.$store.getters['cart/carts']
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
