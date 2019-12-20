<template>
  <div class="flex">
    <!-- 左侧 -->
    <div
      class="pr-3"
      style="width: 65%;"
    >
      <!-- 商品信息 -->
      <DetailInfo :goods="goods" />
    </div>

    <!-- 右侧 -->
    <div
      class="pl-3"
      style="width: 35%;"
    >
      <!-- 卖家信息 -->
      <DetailUser :seller="seller" />

      <!-- 商品评论 -->
      <DetailComment :goodsId="goods._id" :comments="comments" />
    </div>
  </div>
</template>

<script>
import DetailInfo from './components/DetailInfo.vue'
import DetailUser from './components/DetailUser.vue'
import DetailComment from './components/DetailComment.vue'

import {
  getGoodsDetail,
} from '@/request/api/goods'

export default {
  name: 'GoodsDetail',
  components: { DetailInfo, DetailUser, DetailComment },

  data: () => ({
    goods: {}, // 商品信息
    seller: { // 卖家信息
      avatar_url: '',
      nickname: '----',
      school: { name: '-----' },
      gender: '',
      credit_value: 0,
      fans: [],
      published_goods: [],
    },
    comments: [],
  }),

  watch: {
    '$route.query': {
      handler(query) {
        this.initValues(query.goods_id)
      },
      immediate: true,
    },
  },

  methods: {
    async initValues(goods_id) {
      const { code, data: { goods_detail } } = await getGoodsDetail({ goods_id })
      if (code === 2000) {
        this.goods = goods_detail
        this.seller = goods_detail.seller
        this.comments = goods_detail.comments
      }
    },
  },
}
</script>
