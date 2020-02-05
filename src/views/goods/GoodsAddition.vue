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
            val-icon-warning="warning"
            v-model="goods.name"
            warning-text="不能为空"
            :warning="warning"
            @focus="warning = false"
          />
        </div>

        <div class="py-3">
          <div class="mb-2 text-gray-500">商品分类</div>
          <el-select
            class="w-5/12"
            multiple
            placeholder="请选择"
            v-model="goods.category"
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
          <div class="mb-2 text-gray-500">新旧程度</div>
          <div class="w-2/3 flex items-center">
            <vs-slider
              class="mx-2"
              text-fixed="%"
              v-model="goods.degree"
            />
            <div class="w-16 ml-4 text-right text-gray-600 font-bold">
              {{ goods.degree }}%
            </div>
          </div>
        </div>

        <div class="py-3">
          <div class="mb-2 text-gray-500">价格设置</div>
          <div class="flex items-end">
            <div>
              <div class="text-sm text-gray-500">二手价（单价）</div>
              <div class="flex items-center">
                <span class="mr-5 text-2xl text-primary font-bold">
                  ￥{{ Number(goods.price).toFixed(2) }}
                </span>
                <vs-input-number v-model.number="goods.price" />
              </div>
            </div>
            <div class="mx-6">
              <vs-checkbox
                class="justify-start"
                color="warning"
                v-model="goods.checked"
              >
                <span class="text-sm text-gray-500">入手价（可选）</span>
              </vs-checkbox>
              <div class="flex items-center">
                <span
                  class="mr-5 text-2xl font-bold"
                  :class="goods.checked ? 'text-warning' : 'text-gray-500'"
                >
                  ￥{{ Number(goods.original_price).toFixed(2) }}
                </span>
                <vs-input-number
                  color="warning"
                  v-model.number="goods.original_price"
                  :disabled="!goods.checked"
                />
              </div>
            </div>
            <div class="mr-6">
              <div class="text-sm text-gray-500">数量</div>
              <div class="flex items-center">
                <vs-input-number
                  color="success"
                  v-model.number="goods.quantity"
                  :min="1"
                  @input="(v) => { goods.quantity = Number(v).toFixed(0) }"
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
                v-model="goods.delivery"
                vs-value="1"
              >包邮</vs-radio>
              <vs-radio
                class="mx-4"
                v-model="goods.delivery"
                vs-value="2"
              >自费</vs-radio>
              <vs-radio
                v-model="goods.delivery"
                vs-value="3"
              >自提</vs-radio>
            </div>
            <div
              v-if="goods.delivery === '2'"
              class="mt-1 flex items-center"
            >
              <span class="mr-5 text-xl text-gray-600 font-bold">
                ￥{{ Number(goods.delivery_charge).toFixed(2) }}
              </span>
              <vs-input-number
                color="#718096"
                v-model.number="goods.delivery_charge"
              />
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="mb-2 text-gray-500">议价设置</div>
            <div class="flex">
              <vs-radio
                class="mr-4"
                v-model="goods.can_bargain"
                :vs-value="false"
              >一口价</vs-radio>
              <vs-radio
                v-model="goods.can_bargain"
                :vs-value="true"
              >可议价</vs-radio>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="mb-2 text-gray-500">退货设置</div>
            <div class="flex items-center">
              <div class="mr-2">7天无理由退换货</div>
              <vs-switch v-model="goods.can_return" />
            </div>
          </div>
        </div>
        <div class="mt-5 mb-6">
          <div class="mb-2 text-gray-500">更多描述</div>
          <vue-editor
            placeholder="请输入内容(400字以内)..."
            v-model="goods.description"
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

import { createGoods, uploadGoodsImg, deleteGoodsImg } from '@/request/api/goods'

export default {
  name: 'GoodsAddition',
  components: { VueEditor },

  data: () => ({
    goods: {
      name: '', // 商品名称
      category: [], // 所选分类
      quantity: 1, // 商品数量
      degree: 50, // 新旧程度
      price: 0, // 二手价
      original_price: 0, // 入手价
      checked: false, // 是否选择入手价
      delivery: '1', // 运费设置
      delivery_charge: 0, // 运费
      can_bargain: false, // 议价设置
      can_return: false, // 退货设置
      description: '', // 商品描述
    },

    warning: false, // 商品名称警告
    publishBtnDisable: false, // 是否禁用发布按钮
    imgList: [], // 已上传的图片
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },

  created() {
    const goods = JSON.parse(localStorage.getItem('goods'))
    if (goods) {
      this.goods = goods
    }
  },

  methods: {
    // 保存商品描述草稿
    onStorage() {
      localStorage.setItem('goods', JSON.stringify(this.goods))
      this.$message({ showClose: true, message: '已保存到本地草稿箱 ✔️' })
    },

    onCheck() {
      if (this.goods.name.length <= 0) {
        this.warning = true
        return false
      }
      if (this.goods.category.length <= 0) {
        this.$vs.notify({
          color: 'danger',
          title: '商品分类不能为空',
          text: '请添选择商品分类',
        })
        return false
      }
      if (this.goods.delivery === '2' && this.goods.delivery_charge === 0) {
        this.$vs.notify({
          color: 'danger',
          title: '运费输入有误',
          text: '请正确设置运费',
        })
        return false
      }
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
        if (!blobArray.every(el => (el.size / 1024 / 1024) < 3)) {
          this.$vs.notify({
            color: 'danger',
            title: '商品图片不能大于3M',
            text: '请压缩图片后继续上传',
          })
          return false
        }

        const formData = new FormData()
        blobArray.forEach((blob, i) => {
          formData.append('img', blob, `${Date.now()}-${i}.${blob.type.split('/')[1]}`)
        })
        const { code, data } = await uploadGoodsImg(formData)
        if (code === 2000 && data.img_list.length > 0) {
          this.imgList = data.img_list
          return true
        }
        if (code === 5000) {
          this.$vs.notify({
            color: 'danger',
            title: '图片上传失败',
            text: '可能是网络故障哦',
          })
        }
        return false
      }
      this.$vs.notify({
        color: 'danger',
        title: '请添加商品图片',
        text: '赶紧给你的宝贝拍几张照片吧',
      })
      return false
    },

    // 发布商品
    async onPublish() {
      if (this.onCheck()) {
        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#publishBtn',
          scale: 0.45,
        })
        this.publishBtnDisable = true

        try {
          const flag = await this.uploadGoodsImg()
          if (!flag) return

          this.goods.img_list = this.imgList
          createGoods(this.goods)
            .then(({ code }) => {
              if (code === 2000) {
                localStorage.removeItem('goods')
                this.$vs.notify({
                  color: 'success',
                  title: '成功',
                  text: '已发布一件闲置物品',
                })
                this.$router.push('/')
              } else {
                throw new Error()
              }
            })
            .catch(() => {
              deleteGoodsImg({ img_list: this.imgList })
            })
        } finally {
          this.publishBtnDisable = false
          this.$vs.loading.close('#publishBtn > .con-vs-loading')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-select::v-deep {
  .el-input__inner {
    padding-left: 0.4rem;
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
