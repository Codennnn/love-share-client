<template>
  <div>
    <el-transfer
      v-model="category"
      :titles="titles"
      :props="{key: 'value', lebel: 'value'}"
      :data="categoryList"
      @change="change"
    >
      <div
        slot="left-footer"
        class="h-full flex justify-center items-center"
      >
        <vs-button
          class="w-5/12"
          size="small"
        >添加分类</vs-button>
      </div>
    </el-transfer>
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
          this.categoryList = data.category_list.map(el => ({
            value: el,
          }))
          this.category = this.categoryList.map(it => it.value)
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
