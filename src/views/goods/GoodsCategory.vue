<template>
  <div>
    <el-transfer
      v-model="category"
      :titles="titles"
      :props="{key: 'value'}"
      :data="categoryList"
      @change="change"
    ></el-transfer>
  </div>
</template>

<script>
import { getGoodsCategory } from '@/request/api/goods'

export default {
  name: 'GoodsCategory',
  data: () => ({
    titles: ['可选分类', '已选分类'],
    category: [],
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

    change() {
      console.log(this.category)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
