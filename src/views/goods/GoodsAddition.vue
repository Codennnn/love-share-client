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
          <div class="mt-5 mb-6">
            <div class="mb-2 text-gray-500">商品描述</div>
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
            <vs-button @click="publish">确认发布该商品</vs-button>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  data: () => ({
    content: '',
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

    publish() {},
  },
}
</script>

<style lang="scss" scoped>
.img-upload {
  &::v-deep {
    .con-img-upload {
      background: transparent;
    }
  }
}
</style>
