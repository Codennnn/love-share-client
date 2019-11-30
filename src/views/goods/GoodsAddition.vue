<template>
  <div class="pt-3 flex flex-wrap">
    <div class="md:w-full md:mb-6 lg:pr-3 lg:w-4/12">
      <div class="p-5 bg-white rounded-lg">
        <div class="mb-2 text-xl text-gray-600">图片上传</div>
        <vs-upload
          multiple
          ref="fileUpload"
          text="图片格式（JPG、PNG）"
          accept="image/jpeg,image/jpg,image/png"
          :limit="6"
          :show-upload-button="false"
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
                <vs-input-number v-model.number="price" />
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
                  color="warning"
                  v-model.number="originalPrice"
                  :disabled="!checked"
                />
              </div>
            </div>
            <div class="mr-6">
              <div class="text-sm text-gray-500">数量</div>
              <div class="flex items-center">
                <vs-input-number
                  color="success"
                  v-model.number="quantity"
                  :min="1"
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
            :disabled="publishBtnDisable"
            @click="onPublish()"
          >确认发布该商品</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { dataURItoBlob } from '@/utils/util'

import { uploadGoodsImg } from '@/request/api/goods'

export default {
  name: 'GoodsAddition',
  components: { VueEditor },

  data: () => ({
    name: '', // 商品名称
    category: [], // 所选分类
    quantity: 1, // 商品数量
    price: 0.00, // 二手价
    originalPrice: 0.00, // 入手价
    checked: false, // 是否选择入手价
    delivery: '', // 运费设置
    bargain: '', // 议价设置
    returnable: false, // 退货设置
    description: '', // 商品描述
    publishBtnDisable: false, // 是否禁用发布按钮
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },

  created() {
    this.description = localStorage.getItem('goods_editor')
  },

  methods: {
    // 保存商品描述草稿
    onStorage() {
      localStorage.setItem('goods_editor', this.description)
      this.$message({ showClose: true, message: '已保存到本地草稿箱 ✔️' })
    },

    onCheck() {
      return true
    },

    // 上传商品图片
    async uploadGoodsImg() {
      const blobArray = this.$refs.fileUpload.filesx.reduce((res, el, i) => {
        if (!el.remove) {
          res.push(dataURItoBlob(this.$refs.fileUpload.srcs[i].src))
        }
        return res
      }, [])

      if (blobArray.length > 0) {
        const formData = new FormData()
        blobArray.forEach((blob, i) => {
          formData.append('img', blob, `${Date.now()}-${i}.${blob.type.split('/')[1]}`)
        })
        const { code } = await uploadGoodsImg(formData)
        if (code === 2000) {
          //
        }
      } else {
        this.$vs.notify({
          color: 'danger',
          title: '请添加商品图片',
          text: '赶紧给你的宝贝拍几张照片吧',
        })
      }
    },

    onPublish() {
      if (this.onCheck()) {
        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#publishBtn',
          scale: 0.45,
        })
        this.uploadGoodsImg()
        this.publishBtnDisable = true
        setTimeout(() => {
          this.publishBtnDisable = false
          this.$vs.loading.close('#publishBtn > .con-vs-loading')
        }, 2000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-select::v-deep {
  .el-input__inner {
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
