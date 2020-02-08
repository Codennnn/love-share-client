<template>
  <div>
    <div class=" radius"></div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/request/api/order'

export default {
  name: 'OrderEvaluation',
  data: () => ({
    detail: {},
    subOrder: {},
    goodsList: [],
  }),

  mounted() {
    const { orderId, subId } = this.$route.query
    this.getOrderDetail(orderId, subId)
  },

  methods: {
    async getOrderDetail(order_id, sub_id) {
      const { code, data: { order_detail } } = await getOrderDetail({ order_id, sub_id })
      if (code === 2000) {
        if (order_detail) {
          this.detail = order_detail
          this.subOrder = order_detail.sub_order
          this.goodsList = order_detail.sub_order.goods_list
        } else {
          this.$router.replace('/not-found')
        }
      }
    },
  },
}
</script>
