<template>
  <div class="pt-3 flex flex-wrap">
    <div class="md:w-full md:mb-5 lg:pr-3 lg:w-4/12">
      <div class="p-5 bg-white rounded-lg">
        <div class="text-xl text-gray-600">图片上传</div>
        <vs-upload
          class="img-upload text-center"
          multiple
          automatic
          :limit="6"
          text="图片格式（JPG、PNG）"
          action="https://jsonplaceholder.typicode.com/posts/"
          @on-success="successUpload"
        />
      </div>
    </div>

    <div class="lg:pl-2 md:w-full lg:w-8/12">
      <div class="p-5 bg-white rounded-lg">
        <div class="text-xl text-gray-600">商品信息</div>
        <div class="py-3">
          <div class="mb-2 text-gray-500">商品名称</div>
          <vs-input
            class="w-7/12"
            placeholder="请输入商品名称"
            v-model="name"
          />
        </div>
        <div class="py-3">
          <div class="mb-2 text-gray-500">商品分类</div>
          <el-select
            class="w-5/12"
            multiple
            placeholder="请选择"
            v-model="category"
            :multiple-limit="2"
          >
            <el-option
              v-for="item in categoryList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="py-3">
          <div class="mb-2 text-gray-500">价格设置</div>
          <div class="flex items-end">
            <div>
              <div class="text-sm text-gray-500">二手价（单价）</div>
              <div class="flex items-center">
                <span class="mr-5 text-2xl text-primary font-bold">
                  ￥{{ Number(price).toFixed(2) }}
                </span>
                <vs-input-number v-model="price" />
              </div>
            </div>
            <div class="mx-6">
              <vs-checkbox
                class="justify-start"
                color="warning"
                v-model="checked"
              >
                <span class="text-sm text-gray-500">入手价（可选）</span>
              </vs-checkbox>
              <div class="flex items-center">
                <span
                  class="mr-5 text-2xl font-bold"
                  :class="checked ? 'text-warning' : 'text-gray-500'"
                >
                  ￥{{ Number(originalPrice).toFixed(2) }}
                </span>
                <vs-input-number
                  :disabled="!checked"
                  color="warning"
                  v-model="originalPrice"
                />
              </div>
            </div>
            <div class="mr-6">
              <div class="text-sm text-gray-500">数量</div>
              <div class="flex items-center">
                <vs-input-number
                  :min="1"
                  color="success"
                  v-model="num"
                  @input="(e) => { num = Number(e).toFixed(0) }"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="py-3 flex lg:justify-between">
          <div class="md:w-1/3">
            <div class="mb-2 text-gray-500">配送方式</div>
            <div class="flex">
              <vs-radio
                v-model="delivery"
                vs-value="1"
              >包邮</vs-radio>
              <vs-radio
                class="mx-4"
                v-model="delivery"
                vs-value="2"
              >自费</vs-radio>
              <vs-radio
                v-model="delivery"
                vs-value="3"
              >自提</vs-radio>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="mb-2 text-gray-500">议价设置</div>
            <div class="flex">
              <vs-radio
                class="mr-4"
                v-model="bargain"
                vs-value="1"
              >可议价</vs-radio>
              <vs-radio
                v-model="bargain"
                vs-value="2"
              >一口价</vs-radio>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="mb-2 text-gray-500">退货设置</div>
            <div class="flex items-center">
              <div class="mr-2">7天无理由退换货</div>
              <vs-switch v-model="returnable" />
            </div>
          </div>
        </div>
        <div class="mt-5 mb-6">
          <div class="mb-2 text-gray-500">更多描述</div>
          <vue-editor
            placeholder="请输入内容..."
            v-model="description"
          />
        </div>
        <div class="flex justify-end text-sm">
          <vs-button
            class="mr-4"
            color="#646464"
            type="border"
            @click="storage"
          >暂存为草稿</vs-button>
          <vs-button
            id="publishButton"
            class="vs-con-loading__container"
            @click="publish"
          >确认发布该商品</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { getGoodsCategory } from '@/request/api/goods'

export default {
  name: 'GoodsAddition',
  data: () => ({
    name: '', // 商品名称
    category: [],
    categoryList: [], // 商品分类
    num: 1, // 商品数量
    price: '0.00', // 二手价
    originalPrice: '0.00', // 入手价
    checked: false, // 是否选择入手价
    delivery: '', // 运费设置
    bargain: '', // 议价设置
    returnable: false, // 退货设置
    description: '', // 商品描述
    loading: false,
  }),

  components: { VueEditor },

  mounted() {
    this.getGoodsCategory()
    this.description = localStorage.getItem('goods_editor')
  },

  methods: {
    async getGoodsCategory() {
      const { code, data } = await getGoodsCategory()
      if (code === 2000) {
        this.categoryList = data.category_list
      }
    },

    successUpload() {
      this.$vs.notify({ color: 'success', title: 'Upload Success', text: 'Lorem ipsum dolor sit amet, consectetur' })
    },

    storage() {
      localStorage.setItem('goods_editor', this.description)
      this.$message({ showClose: true, message: '已保存到本地草稿箱 ✔️' })
    },

    publish() {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#publishButton',
        scale: 0.45,
      })
      setTimeout(() => {
        this.$vs.loading.close('#publishButton > .con-vs-loading')
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.img-upload {
  &::v-deep .con-img-upload {
    background: transparent;
  }
}

.el-select {
  &::v-deep .el-input__inner {
    border: 1px solid rgba(0, 0, 0, 0.2);
    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}

.con-upload {
  &::v-deep .con-input-upload.disabled-upload {
    display: none;
  }
}
</style>
