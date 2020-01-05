<template>
  <div>
    <GoodsList
      :goodsList="goodsList"
      :columns="4"
    >
    </GoodsList>
  </div>
</template>

<script>
import GoodsList from '@/views/goods/GoodsList.vue'

export default {
  name: 'GoodsCategory',
  components: { GoodsList },

  data: () => ({
    goodsList: [],
    category: 'all',
    currentPage: 1,
    pageSize: 10,
    pagination: {},
    searchText: '',
  }),
}
</script>
