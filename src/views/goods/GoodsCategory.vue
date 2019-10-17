<template>
  <div>

  </div>
</template>

<script>
import { getGoodsCategory } from '@/request/api/goods'

export default {
  name: 'GoodsCategory',
  data: () => ({
    category: '',
    categoryList: [],
  }),

  mounted() {
    this.getGoodsCategory()
  },

  methods: {
    async getGoodsCategory() {
      try {
        const { code, data } = await getGoodsCategory()
        if (code === 2000) {
          this.categoryList = data.categoryList
        }
      } catch {
        //
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
