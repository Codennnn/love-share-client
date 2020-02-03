<template>
  <vs-dropdown vs-custom-content>
    <el-badge
      class="mt-1"
      :value="this.cartAmount > 0 ? this.cartAmount : ''"
    >
      <feather
        class="nav-icon "
        type="shopping-cart"
      ></feather>
    </el-badge>
    <vs-dropdown-menu class="menu-box">
      <div class="w-full py-4 text-center text-white bg-primary cursor-pointer">
        <p class="text-xl">共有 {{ this.cartAmount }} 件商品</p>
      </div>
      <VuePerfectScrollbar
        style="height: 350px;"
        :settings="{
          maxScrollbarLength: 160,
          wheelSpeed: 0.60,
        }"
      >
        <ul v-if="this.cartList.length > 0">
          <li
            class="flex p-2 transition cursor-pointer hover:bg-gray-200"
            v-for="(item, i) in cartList"
            :key="i"
            @click="$router.push({path: 'goods-detail', query: { goodsId: item.goods._id }})"
          >
            <el-image
              class="mr-2 rounded-lg"
              style="width: 80px; height: 80px"
              fit="cover"
              :src="`${item.goods.img_list[0]}?imageView2/2/w/100`"
            ></el-image>
            <div class="flex-1 overflow-hidden">
              <div class="text-overflow">
                {{ item.goods.name }}
              </div>
              <div class="mt-2 flex justify-between items-center">
                <div class="whitespace-no-wrap text-sm text-gray-500">
                  <span class="font-bold">￥{{ Number(item.goods.price).toFixed(2) }}</span>
                  <span> x {{ item.amount }}</span>
                </div>
                <i
                  title="移出购物车"
                  class="el-icon-close text-danger m-1"
                  @click.stop="$store.dispatch('cart/removeCartItem', item._id)"
                ></i>
              </div>
            </div>
          </li>
        </ul>
        <div
          class="h-full flex flex-col items-center justify-center"
          v-else
        >
          <vs-icon
            size="80px"
            icon="blur_on"
            color="#718096"
          ></vs-icon>
          <div class="mt-4 text-gray-600 text-sm">购物车空空如也</div>
        </div>
      </VuePerfectScrollbar>
      <div
        class="w-full p-2 text-center text-primary transition
                cursor-pointer font-semibold bg-gray-100 hover:bg-gray-200"
        @click="$router.push('/goods-cart')"
      >
        <span>进入购物车</span>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: { VuePerfectScrollbar },

  created() {
    // 获取购物车
    this.$store.dispatch('cart/getCartList')
  },

  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartAmount']),
  },
}
</script>
