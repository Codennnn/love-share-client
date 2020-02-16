<template>
  <div class="pt-2 px-10">
    <div v-if="!showSuccess">
      <p class="mb-1 text-xl text-center font-bold">评价订单</p>
      <p class="mb-6 text-sm text-gray-500 text-center">
        <span class="mr-4">订单号：{{ subOrder._id }}</span>
        <span>{{ $dayjs(subOrder.created_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </p>
    </div>
    <div
      v-else
      class="mb-6 flex-row-center"
    >
      <feather
        class="mr-4 text-success"
        size="50"
        type="check-circle"
      ></feather>
      <div>
        <div class="text-xl">评价已提交成功</div>
        <div class="text-gray-600">乐豆将于一天左右返回到您的账户中</div>
      </div>
    </div>

    <div class="mb-6 py-6 flex-row-center radius bg-white">
      <img
        src="@/assets/images/bg-who1.png"
        alt="物流"
      >
      <div class="ml-4 mr-32">
        <div class="mb-1 text-xl">物流服务评价</div>
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
      class="mb-6 p-8 flex items-center bg-white radius overflow-hidden"
      v-for="(it, i) in subOrder.goods_list"
      :key="i"
    >
      <div class="mr-4 py-4 px-20 text-center">
        <el-image
          class="w-32 h-32 radius"
          fit="contain"
          :src="it.goods.img_list[0]"
        ></el-image>
        <p class="my-3 text-gray-600">{{ it.goods.name }}</p>
        <p class="font-bold">￥{{ $numFixed(it.goods.price) }}</p>
      </div>
      <div
        v-if="reviews.length > 0"
        class="flex-1 pr-16"
      >
        <div class="mb-6 flex items-center">
          <div class="w-32">商品评分</div>
          <el-rate
            v-if="!it.goods.review || !it.goods.review._id"
            v-model="reviews[i].star"
            :colors="colors"
          ></el-rate>
          <el-rate
            v-else
            disabled
            v-model="it.goods.review.star"
            :colors="colors"
          ></el-rate>
          <div
            v-if="it.goods.review && it.goods.review._id"
            class="flex items-center"
          >
            <feather
              class="ml-4 mr-2 text-success"
              type="check-circle"
            ></feather>
            已完成评价
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-32">评价晒单</div>
          <vs-textarea
            v-if="!it.goods.review || !it.goods.review._id"
            class="w-2/3"
            height="80"
            label="评论超过 20 个字有机会获得 50 乐豆哦~"
            counter="200"
            maxlength="200"
            v-model.trim="reviews[i].content"
          />
          <vs-textarea
            v-else
            disabled
            class="w-2/3"
            height="80"
            label="已评论此商品~"
            maxlength="200"
            v-model.trim="it.goods.review.content"
          />
        </div>
      </div>
    </div>

    <div class="p-8 radius bg-white text-center">
      <vs-button
        class="w-56"
        @click="onPostReview()"
      >发 表</vs-button>
    </div>
  </div>
</template>

<script>
import { postReview } from '@/request/api/goods'
import { getOrderDetail } from '@/request/api/order'

export default {
  name: 'OrderReview',
  data: () => ({
    subOrder: {},
    reviews: [],

    showSuccess: false,
    rate: 0,
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
  }),

  mounted() {
    this.getOrderDetail()
  },

  methods: {
    async getOrderDetail() {
      const { orderId: order_id, subId: sub_id } = this.$route.query
      const { code, data: { order_detail } } = await getOrderDetail({ order_id, sub_id })
      if (code === 2000) {
        if (order_detail) {
          this.subOrder = order_detail.sub_order
          this.reviews = order_detail.sub_order.goods_list.map(el => ({
            _id: el.goods._id,
            star: 0,
            content: '',
            is_review: !!el.goods?.review?._id,
          }))
        } else {
          this.$router.replace('/not-found')
        }
      }
    },

    async onPostReview() {
      const reviews = this.reviews
        .filter(el => !el.is_review) // 过滤掉已评价的商品
        .filter(({ star, content }) => star > 0 && content.trim().length > 0)

      if (reviews.length > 0) {
        const { code } = await postReview({ reviews })
        if (code === 2000) {
          await this.getOrderDetail()
          this.showSuccess = true
        }
      }
    },
  },
}
</script>
