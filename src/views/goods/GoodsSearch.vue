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

import { getGoodsListBySearch } from '@/request/api/goods'

export default {
  name: 'GoodsSearch',
  components: { GoodsList },

  data: () => ({
    goodsList: [],
    page: 1,
    pageSize: 10,
    pagination: {},
  }),

  mounted() {
    const { search } = this.$route.query
    this.setTitle(search)
    this.getGoodsListBySearch(search)
  },

  methods: {
    async getGoodsListBySearch(search) {
      const { code, data } = await getGoodsListBySearch({
        page: this.page,
        page_size: this.pageSize,
        search,
      })
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },

    setTitle(search) {
      document.title = `${search} - 商品搜索`
    },
  },
}
</script>
