<template>
  <div>
    <vs-row class="pt-3">
      <vs-col
        class="pr-3"
        vs-w="5"
      >
        <div class="p-5 bg-white rounded-lg">
          <div class="text-xl text-gray-600">图片上传</div>
          <vs-upload
            class="img-upload text-center"
            multiple
            automatic
            :limit="6"
            text="上传商品图片"
            action="https://jsonplaceholder.typicode.com/posts/"
            @on-success="successUpload"
          />
        </div>
      </vs-col>

      <vs-col
        class="pl-2"
        vs-w="7"
      >
        <div class="p-5 bg-white rounded-lg">
          <div class="text-xl text-gray-600">商品信息</div>
          <div class="py-3">
            <div class="mb-2 text-gray-500">商品名称</div>
            <vs-input
              class="w-7/12"
              placeholder="请输入商品名称"
              v-model="title"
            />
          </div>
          <div class="py-3">
            <div class="mb-2 text-gray-500">商品分类</div>
            <el-select
              class="w-5/12"
              multiple
              placeholder="请选择"
              v-model="classification"
              :multiple-limit="2"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="py-3">
            <div class="mb-2 text-gray-500">价格设置</div>
            <div class="flex items-end">
              <div class="mr-6">
                <div class="text-sm text-gray-500">二手价</div>
                <div class="flex items-center">
                  <span class="mr-5 text-2xl text-primary font-bold">
                    ￥{{ Number(price).toFixed(2) }}
                  </span>
                  <vs-input-number v-model="price" />
                </div>
              </div>
              <div>
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
                    ￥{{ Number(price2).toFixed(2) }}
                  </span>
                  <vs-input-number
                    :disabled="!checked"
                    color="warning"
                    v-model="price2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="py-3 flex">
            <div class="w-1/3">
              <div class="mb-2 text-gray-500">运费设置</div>
              <div class="flex">
                <vs-radio
                  class="mr-4"
                  v-model="radios"
                  vs-name="radios1"
                  vs-value="luis"
                >包邮</vs-radio>
                <vs-radio
                  v-model="radios"
                  vs-name="radios1"
                  vs-value="add"
                >自费</vs-radio>
              </div>
            </div>
            <div class="w-1/3">
              <div class="mb-2 text-gray-500">议价设置</div>
              <div class="flex">
                <vs-radio
                  class="mr-4"
                  v-model="radios2"
                  vs-name="radios2"
                  vs-value="luis"
                >可议价</vs-radio>
                <vs-radio
                  v-model="radios2"
                  vs-name="radios2"
                  vs-value="add"
                >一口价</vs-radio>
              </div>
            </div>
          </div>
          <div class="mt-5 mb-6">
            <div class="mb-2 text-gray-500">更多描述</div>
            <vue-editor
              placeholder="请输入内容..."
              v-model="content"
            />
          </div>
          <div class="flex justify-end">
            <vs-button
              class="mr-3"
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
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'GoodsAddition',
  data: () => ({
    title: '',
    content: '',
    classification: [],
    price: '0.00',
    price2: '0.00',
    checked: false,
    radios: '',
    radios2: '',
    options: [{
      value: '选项1',
      label: '黄金糕',
    }, {
      value: '选项2',
      label: '双皮奶',
    }, {
      value: '选项3',
      label: '蚵仔煎',
    }, {
      value: '选项4',
      label: '龙须面',
    }, {
      value: '选项5',
      label: '北京烤鸭',
    }],
    loading: false,
  }),

  components: { VueEditor },

  mounted() {
    this.content = localStorage.getItem('goods_editor')
  },

  methods: {
    successUpload() {
      this.$vs.notify({ color: 'success', title: 'Upload Success', text: 'Lorem ipsum dolor sit amet, consectetur' })
    },

    storage() {
      localStorage.setItem('goods_editor', this.content)
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
  }
}
</style>
