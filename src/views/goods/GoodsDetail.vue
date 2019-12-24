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
  }),

  watch: {
    '$route.query': {
      handler(query) {
        this.goodsId = query.goods_id
      },
      immediate: true,
    },
  },

  activated() {
    this.getGoodsDetail()
    this.getGoodsSeller()
    this.getGoodsComments()
  },

  methods: {
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail({ goods_id: this.goodsId })
      if (code === 2000) {
        this.goods = data.goods_detail
      }
    },

    async getGoodsSeller() {
      const { code, data } = await getGoodsSeller({ goods_id: this.goodsId })
      if (code === 2000) {
        this.seller = data.seller
      }
    },

    async getGoodsComments() {
      const { code, data } = await getGoodsComments({ goods_id: this.goodsId })
      if (code === 2000) {
        this.comments = data.comments
      }
    },
  },
}
</script>
