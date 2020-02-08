<template>
  <div class="pt-2 px-10">
    <p class="mb-1 text-xl text-center font-bold">评价订单</p>
    <p class="mb-6 text-sm text-gray-500 text-center">
      <span class="mr-4">订单号：{{ subOrder._id }}</span>
      <span>{{ $dayjs(subOrder.created_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </p>
    <div class="mb-6 py-6 flex-row-center radius bg-white">
      <img
        src="@/assets/images/bg-who1.png"
        alt="物流"
      >
      <div class="ml-4 mr-32">
        <div class="mb-1 text-gray-700 text-xl">物流服务评价</div>
        <div class="text-sm text-gray-600">羞涩的配送小哥还没更新个人信息</div>
      </div>
      <div
        class="mr-5"
        v-for="(it, i) in ['快递包装', '送货速度', '配送员服务']"
        :key="i"
      >
        <span class="text-gray-600">{{ it }}</span>
        <el-rate
          v-model="rate"
          :colors="colors"
        >
        </el-rate>
      </div>
    </div>

    <div
      class="p-8 flex items-center bg-white radius"
      v-for="(it, i) in subOrder.goods_list"
      :key="i"
    >
      <div class="py-4 px-20 text-center">
        <el-image
          class="w-32 h-32 radius"
          fit="contain"
          :src="it.goods.img_list[0]"
        ></el-image>
        <p class="my-3 text-gray-600">{{ it.goods.name }}</p>
        <p class="text-gray-700 font-bold">￥{{ Number(it.goods.price).toFixed(2) }}</p>
      </div>
      <div class="flex-1 pr-16">
        <div class="mb-6 flex items-center">
          <div class="w-32">商品评分</div>
          <el-rate
            v-model="rate"
            :colors="colors"
          >
          </el-rate>
        </div>
        <div class="flex items-start">
          <div class="w-32 mr-5">评价晒单</div>
          <vs-textarea
            label="评论超过 20 个字有机会获得 50 乐豆哦~"
            counter="200"
            maxlength="200"
            v-model.trim="textContent"
          />
        </div>
      </div>
    </div>
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

    rate: null,
    textContent: '',
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
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
