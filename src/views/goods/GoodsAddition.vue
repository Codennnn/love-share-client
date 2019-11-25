<template>
  <div class="pt-3 flex flex-wrap">
    <div class="md:w-full md:mb-6 lg:pr-3 lg:w-4/12">
      <div class="p-5 bg-white rounded-lg">
        <div class="mb-2 text-xl text-gray-600">图片上传</div>
        <vs-upload
          multiple
          automatic
          text="图片格式（JPG、PNG）"
          action="/api/goods/img/upload"
          accept="image/jpeg,image/jpg,image/png"
          fileName="img"
          :limit="6"
          :headers="headers"
          @on-success="onUploadSuccess()"
          @on-delete="onUploadDelete"
          @on-error="onUploadError()"
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
              v-for="(item, i) in categoryList"
              :key="i"
              :label="item.name"
              :value="item._id"
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
                  v-model="quantity"
                  @input="(v) => { quantity = Number(v).toFixed(0) }"
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
            @click="onStorage()"
          >暂存为草稿</vs-button>
          <vs-button
            id="publishBtn"
            class="vs-con-loading__container"
            :disabled="isPublishing"
            @click="onPublish()"
          >确认发布该商品</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { deleteGoodsImg } from '@/request/api/goods'
import { getCategoryList } from '@/request/api/common'
import { getToken } from '@/utils/token'

export default {
  name: 'GoodsAddition',
  components: { VueEditor },

  data: () => ({
    headers: {},
    name: '', // 商品名称
    category: [],
    categoryList: [], // 商品分类
    quantity: 1, // 商品数量
    price: '0.00', // 二手价
    originalPrice: '0.00', // 入手价
    checked: false, // 是否选择入手价
    delivery: '', // 运费设置
    bargain: '', // 议价设置
    returnable: false, // 退货设置
    description: '', // 商品描述
    isPublishing: false, // 是否正在发布中
  }),

  async created() {
    const { code, data } = await getCategoryList()
    if (code === 2000) {
      this.categoryList = data.category_list
    }
    this.description = localStorage.getItem('goods_editor')
  },

  mounted() {
    this.headers = {
      Authorization: `Bearer ${getToken()}`,
    }
  },

  methods: {
    onUploadSuccess() {
      this.$vs.notify({
        color: 'success',
        title: '上传成功',
        text: '已上传一张图片 ：）',
      })
    },

    async onUploadDelete(e) {
      const { code } = await deleteGoodsImg({
        img_list: [`${e.name}`],
        img_with_id: false,
      })
      if (code !== 2000) {
        this.$vs.notify({
          color: 'danger',
          title: '删除失败',
          text: '删除图片不成功，请重试 ：（',
        })
      }
    },

    onUploadError() {
      this.$vs.notify({
        color: 'danger',
        title: '上传失败',
        text: '图片上传失败，请尝试重新上传！',
      })
    },

    onStorage() {
      localStorage.setItem('goods_editor', this.description)
      this.$message({ showClose: true, message: '已保存到本地草稿箱 ✔️' })
    },

    onCheck() {
      return true
    },

    onPublish() {
      if (this.onCheck()) {
        this.isPublishing = true
        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#publishBtn',
          scale: 0.45,
        })
        setTimeout(() => {
          this.isPublishing = false
          this.$vs.loading.close('#publishBtn > .con-vs-loading')
        }, 2000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-select {
  &::v-deep .el-input__inner {
    border: 1px solid rgba(0, 0, 0, 0.2);
    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}

.con-upload::v-deep {
  .con-input-upload.disabled-upload {
    display: none;
  }
}
</style>
