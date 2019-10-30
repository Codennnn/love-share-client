<template>
  <vs-sidebar
    spacer
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="sidebar-main"
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <span class="text-lg">{{ title }}</span>
      <i
        class="el-icon-close text-2xl font-bold cursor-pointer"
        @click.stop="isSidebarActiveLocal = false"
      ></i>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar
      class="scroll-area pt-4 pb-6"
      :settings="settings"
    >
      <div class="p-6">
        <!-- 标题 -->
        <vs-input
          class="mt-5 w-full"
          label="标题"
          v-model="name"
        />

        <!-- 分类 -->
        <div
          class="mt-5"
          style="font-size: 0.85rem;color: rgba(0, 0, 0, .7);"
        >商品分类</div>
        <el-select
          class="w-full"
          v-model="category"
          multiple
          placeholder="请选择分类"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 价格 -->
        <vs-input
          class="mt-5 w-full"
          label="价格"
          icon="attach_money"
          v-model="price"
        />

        <!-- IMG -->
        <vs-upload
          class="img-upload"
          text="Upload Image"
          ref="fileUpload"
        />
      </div>
    </VuePerfectScrollbar>

    <div
      class="flex flex-wrap items-center p-6 text-sm"
      slot="footer"
    >
      <vs-button class="mr-6">确认添加</vs-button>
      <vs-button
        type="border"
        color="danger"
        @click="isSidebarActiveLocal = false"
      >取消操作</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { getGoodsCategory } from '@/request/api/goods'

export default {
  name: 'AddNewDataSidebar',
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    name: '',
    category: [],
    categoryList: [],
    price: '',
    settings: {
      maxScrollbarLength: 180,
      wheelSpeed: 0.60,
    },
  }),

  components: { VuePerfectScrollbar },

  mounted() {
    this.getGoodsCategory()
  },

  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar')
        }
      },
    },
  },

  watch: {
    isSidebarActive(flag) {
      if (flag) {
        if (this.title === '添加求购信息') {
          this.name = ''
          this.category = []
          this.price = ''
        } else {
          this.initValues()
        }
      }
    },
  },

  methods: {
    initValues() {
      this.name = this.data.name
      this.category = this.data.category
      this.price = this.data.price
      this.$refs.fileUpload.srcs = []
    },

    async getGoodsCategory() {
      try {
        const { code, data } = await getGoodsCategory()
        if (code === 2000) {
          this.categoryList = data.category_list
        }
      } catch {
        //
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-main {
  &::v-deep {
    .vs-sidebar--items {
      padding: 0;
      overflow: hidden;
    }
    .vs-sidebar--background {
      z-index: 52010;
    }
    .vs-sidebar {
      z-index: 52010;
      width: 400px;
      max-width: 90vw;
      .vs-select--input {
        border-color: rgba(0, 0, 0, 0.2);
      }
      .img-upload {
        margin-top: 2rem;
        .con-img-upload {
          padding: 0;
        }
        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }
}

.scroll-area {
  height: calc(100% - 4rem);
}

.el-select {
  &::v-deep {
    .el-input__inner {
      border: 1px solid rgba(0, 0, 0, 0.2);
      &::placeholder {
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>

<style>
.el-select-dropdown {
  z-index: 52012 !important;
}
</style>
