<template>
  <div class="pt-3">
    <el-transfer
      v-model="category"
      :titles="titles"
      :props="{key: 'value', lebel: 'value'}"
      :data="categoryList"
      @left-check-change="leftCheck"
      @change="change"
    >
      <div
        slot="left-footer"
        class="h-full flex justify-center items-center"
      >
        <vs-button
          class="mr-2"
          color="danger"
          size="small"
          slot="reference"
          :disabled="disabled"
          @click="onDeleteCategory()"
        >删除选中分类</vs-button>
        <el-popover
          width="200"
          trigger="manual"
          v-model="showPopover"
        >
          <div>
            <vs-input
              class="w-full"
              label-placeholder="分类名称"
              v-model="categoryName"
            />
            <div class="mt-2 flex justify-end">
              <vs-button
                type="flat"
                color="#646464"
                @click="showPopover = false"
              >取消</vs-button>
              <vs-button
                type="flat"
                @click="onAddCategory()"
              >确定</vs-button>
            </div>
          </div>
          <vs-button
            size="small"
            slot="reference"
            @click="showPopover = true"
          >添加分类</vs-button>
        </el-popover>
      </div>
    </el-transfer>
  </div>
</template>

<script>
import { getGoodsCategory, addGoodsCategory, deleteGoodsCategory } from '@/request/api/goods'

export default {
  name: 'GoodsCategory',
  data: () => ({
    showPopover: false,
    categoryName: '',
    titles: ['可选分类', '已选分类'],
    disabled: true,
    selected: [],
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

    onAddCategory() {
      if (this.categoryName.length > 0) {
        this.categoryList.push({ value: this.categoryName })
        this.showPopover = false
        addGoodsCategory()
      }
    },

    onDeleteCategory() {
      this.categoryList.forEach((el, i, _) => {
        this.selected.forEach((it) => {
          if (el.value === it) {
            _.splice(i, 1)
            this.disabled = true
          }
        })
      })
      deleteGoodsCategory()
    },

    leftCheck(it) {
      this.selected = it
      if (this.selected.length > 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },

    change() {
      // console.log(this.category)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
