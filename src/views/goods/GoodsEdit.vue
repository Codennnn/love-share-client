<template>
  <div class="pt-3 flex flex-wrap">
    <div class="md:w-full md:mb-6 lg:pr-3 lg:w-4/12">
      <div class="p-5 bg-white radius">
        <div class="mb-2 text-xl text-gray-600">图片上传</div>
        <template>
          <el-popover
            trigger="hover"
            v-for="(it, i) in goods.img_list"
            :key="i"
          >
            <div>
              <p class="text-gray-600">是否删除该图片？ <br />
                该操作将不可恢复。</p>
              <div class="flex">
                <vs-button
                  class="w-16 mt-1 ml-auto"
                  size="small"
                  type="flat"
                  color="danger"
                  @click.native="deleteImg(it)"
                >删除</vs-button>
              </div>
            </div>
            <vs-image
              slot="reference"
              class="w-1/3 mb-4"
              :src="it"
            />
          </el-popover>
        </template>
        <vs-divider />
        <vs-upload
          multiple
          ref="fileUpload"
          text="图片格式（JPG、PNG）"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          :limit="limit"
          :show-upload-button="false"
        />
      </div>
    </div>

    <div class="lg:pl-2 md:w-full lg:w-8/12">
      <div class="p-5 bg-white radius">
        <div class="text-xl text-gray-600">商品信息</div>
        <div class="py-3">
          <div class="mb-2 text-gray-500">商品名称</div>
          <vs-input
            class="w-7/12"
            placeholder="请输入商品名称"
            val-icon-warning="warning"
            v-model="goods.name"
            warning-text="商品名称不能为空"
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
          <div class="mb-2 text-gray-500">价格设置</div>
          <div class="flex items-end">
            <div>
              <div class="text-sm text-gray-500">二手价（单价）</div>
              <div class="flex items-center">
                <span class="mr-5 text-2xl text-primary font-bold">
                  ￥{{ $numFixed(goods.price) }}
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
                  ￥{{ $numFixed(goods.original_price) }}
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
                  @input="(v) => { goods.quantity = $numFixed(v, 0) }"
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
                ￥{{ $numFixed(goods.delivery_charge) }}
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
            id="updateBtn"
            class="vs-con-loading__container"
            :disabled="updateBtnDisable"
            @click="onUpdate()"
          >确认更新商品信息</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { dataURItoBlob } from '@/utils/util'

import {
  getGoodsDetail, uploadGoodsImg, deleteGoodsImg, editGoods,
} from '@/request/api/goods'

export default {
  name: 'GoodsEdit',
  components: { VueEditor },

  data: () => ({
    goods: {},
    warning: false, // 商品名称警告
    updateBtnDisable: false, // 是否禁用发布按钮
    imgList: [],
    deleteList: [],
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
    limit() {
      return 6 - this.goods?.img_list?.length
    },
  },

  mounted() {
    this.getGoodsDetail(this.$route.query.goodsId)
  },

  methods: {
    async getGoodsDetail(goods_id) {
      const { code, data } = await getGoodsDetail({ goods_id })
      if (code === 2000) {
        data.goods_detail.category = data.goods_detail.category.map(
          el => this.categoryList.filter(it => it.name === el.name)[0]._id,
        )
        this.goods = data.goods_detail
      }
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
          return
        }

        const formData = new FormData()
        blobArray.forEach((blob, i) => {
          formData.append('img', blob, `${Date.now()}-${i}.${blob.type.split('/')[1]}`)
        })
        const { code, data } = await uploadGoodsImg(formData)
        if (code === 2000 && data.img_list.length > 0) {
          this.imgList = data.img_list
          this.goods.img_list.push(...this.imgList)
        }
      }
    },

    deleteImg(item) {
      this.deleteList.push(item)
      this.goods.img_list.splice(this.goods.img_list.indexOf(item), 1)
    },

    onUpdate() {
      if (this.onCheck()) {
        this.$loading(
          async () => {
            this.updateBtnDisable = true

            await this.uploadGoodsImg()

            if (this.goods.img_list.length > 0) {
              editGoods(this.goods)
                .then(async ({ code }) => {
                  if (code === 2000) {
                    if (this.deleteList.length > 0) {
                    // 更新商品信息时才执行删除图片操作
                      await deleteGoodsImg({ img_list: this.deleteList })
                    }
                    this.$router.go(-1)
                  } else {
                    throw new Error()
                  }
                })
                .catch(() => {
                  deleteGoodsImg({ img_list: this.imgList })
                })
            } else {
              this.$vs.notify({
                color: 'danger',
                title: '请添加商品图片',
                text: '赶紧给你的宝贝拍几张照片吧',
              })
            }
          },
          {
            background: 'primary',
            color: '#fff',
            container: '#updateBtn',
            scale: 0.45,
          },
          () => { this.updateBtnDisable = false },
        )
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

.vs-image::v-deep {
  .vs-image--img:hover {
    filter: grayscale(100%);
  }
}
</style>
