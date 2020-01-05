<template>
  <div>
    <GoodsList
      :goodsList="goodsList"
      :columns="5"
    >
    </GoodsList>

    <vs-pagination
      v-if="goodsList.length > 0"
      class="mt-12 mb-5"
      v-model="page"
      :goto="goodsList.length > 10"
      :total="Math.ceil(pagination.total / this.pageSize)"
    ></vs-pagination>
  </div>
</template>

<script>
import GoodsList from '@/views/goods/GoodsList.vue'

import { getGoodsListByCategory } from '@/request/api/goods'

export default {
  name: 'GoodsCategory',
  components: { GoodsList },

  data: () => ({
    goodsList: [],
    category: '',
    page: 1,
    pageSize: 10,
    pagination: {},
    searchText: '',
  }),

  mounted() {
    this.category = this.$route.query.category
    this.getGoodsListByCategory()
  },

  methods: {
    async getGoodsListByCategory() {
      const { code, data } = await getGoodsListByCategory({
        page: this.page,
        page_size: this.pageSize,
        category: this.category,
      })
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },
  },
}
</script>
