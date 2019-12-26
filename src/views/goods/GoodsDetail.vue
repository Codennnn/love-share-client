<template>
  <div class="flex">
    <!-- 左侧 -->
    <div
      class="pr-3"
      style="width: 65%;"
    >
      <!-- 商品信息 -->
      <DetailInfo
        :goods="goods"
        :goodsId="goodsId"
        @setAmount="(e) => amount = e"
        @settle="isSidebarActive = true"
      />
    </div>

    <!-- 右侧 -->
    <div
      class="pl-3"
      style="width: 35%;"
    >
      <!-- 卖家信息 -->
      <DetailUser :seller="seller" />

      <!-- 商品评论 -->
      <DetailComment
        :comments="comments"
        :goodsId="goodsId"
        @refreshComments="getGoodsComments()"
      />
    </div>

    <vs-sidebar
      spacer
      click-not-close
      position-right
      hidden-background
      parent="body"
      default-index="1"
      color="primary"
      class="sidebar-main"
      v-model="isSidebarActive"
    >
      <div
        id="sidebar-container"
        class="h-full vs-con-loading__container"
      >
        <div
          class="flex items-center justify-between px-6"
          style="height: 3.5rem;"
        >
          <span class="text-lg">购买信息</span>
          <i
            class="el-icon-close text-2xl font-bold cursor-pointer"
            @click.stop="isSidebarActive = false"
          ></i>
        </div>
        <vs-divider class="my-0"></vs-divider>

        <div class="container pl-8 pr-16 py-4">
          <div class="mb-8">
            <p class="text-sm text-gray-600">商品名称</p>
            <p class="mb-4 text-lg font-bold">{{ goods.name }}</p>
            <p class="text-sm text-gray-600">商品价格</p>
            <p class="mb-4 text-lg font-bold">￥{{ Number(goods.price).toFixed(2) }}</p>
            <p class="text-sm text-gray-600">购买数量</p>
            <p class="mb-4 text-lg font-bold">{{ amount }}件</p>
          </div>
          <ul>
            <li>
              <vs-radio
                v-model="payment"
                vs-value="huabei"
              >
                <div class="flex items-center">
                  <span class="mx-2 text-sm">余额支付</span>
                  <svg class="w-8 h-8">
                    <use xlink:href="#icon-paypal"></use>
                  </svg>
                </div>
              </vs-radio>
            </li>
            <vs-divider />
            <li
              class="mb-2"
              v-for="(item, index) in icons"
              :key="index"
            >
              <vs-radio
                class="text-left"
                v-model="payment"
                :vs-value="item.value"
              >
                <div class="flex items-center">
                  <span class="mx-2 text-sm">{{ item.label }}</span>
                  <svg class="w-8 h-8">
                    <use :xlink:href="`#icon-${item.icon}`"></use>
                  </svg>
                </div>
              </vs-radio>
            </li>
            <vs-divider />
            <li class="text-gray-600">
              <span class="cursor-pointer">
                <i class="el-icon-plus"></i>
                <span class="ml-1 text-sm">添加银行卡</span>
              </span>
            </li>
          </ul>
        </div>

        <div
          slot="footer"
          class="flex items-center text-sm"
          style="height: 4rem;"
        >
          <vs-button class="w-1/3 ml-auto mr-6">确认并付款</vs-button>
        </div>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import DetailInfo from './components/DetailInfo.vue'
import DetailUser from './components/DetailUser.vue'
import DetailComment from './components/DetailComment.vue'

import {
  getGoodsDetail,
  getGoodsSeller,
  getGoodsComments,
} from '@/request/api/goods'

const icons = [
  { icon: 'weixinzhifu', label: '微信支付', value: 'weixin' },
  { icon: 'zhifubao', label: '支付宝支付', value: 'zhifubao' },
  { icon: 'yinlian', label: '银行卡支付', value: 'yinlian' },
]

export default {
  name: 'GoodsDetail',
  components: { DetailInfo, DetailUser, DetailComment },

  data: () => ({
    goodsId: '',
    goods: {},
    comments: [],
    seller: { // 卖家信息
      avatar_url: '',
      nickname: '----',
      school: { name: '-----' },
      gender: '',
      credit_value: 0,
      fans: [],
      published_goods: [],
    },

    icons,
    amount: 1,
    payment: 'huabei',
    isSidebarActive: false,
  }),

  watch: {
    '$route.query': {
      handler(query) {
        this.goodsId = query.goodsId
      },
      immediate: true,
    },
  },

  activated() {
    this.getGoodsDetail()
    this.getGoodsSeller()
    this.getGoodsComments()
  },

  deactivated() {
    this.isSidebarActive = false
  },

  methods: {
    // 获取商品信息
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail({ goods_id: this.goodsId })
      if (code === 2000) {
        this.goods = data.goods_detail
      }
    },

    // 获取卖家信息
    async getGoodsSeller() {
      const { code, data } = await getGoodsSeller({ goods_id: this.goodsId })
      if (code === 2000) {
        this.seller = data.seller
      }
    },

    // 获取评论
    async getGoodsComments() {
      const { code, data } = await getGoodsComments({ goods_id: this.goodsId })
      if (code === 2000) {
        this.comments = data.comments
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-main::v-deep {
  .container {
    height: calc(100% - 7.5rem);
  }
  .vs-sidebar--items {
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  .vs-sidebar--background {
    z-index: 52010;
  }
  .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;
  }
}

.con-vs-radio {
  justify-content: start;
}
</style>
