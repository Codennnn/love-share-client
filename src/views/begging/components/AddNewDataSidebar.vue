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
      <span
        class="text-lg"
        :class="[title === '添加求购信息' ? 'text-primary' : 'text-success']"
      >{{ title }}</span>
      <i
        class="el-icon-close text-2xl font-bold cursor-pointer"
        @click.stop="isSidebarActiveLocal = false"
      ></i>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar
      class="scroll-area pt-4 pb-6"
      :settings="{
        maxScrollbarLength: 180,
        wheelSpeed: 0.60,
      }"
    >
      <div class="p-6">
        <!-- 标题 -->
        <vs-input
          class="mt-5 w-full"
          label="标题"
          placeholder="请输入标题"
          v-model="name"
        />

        <!-- 分类 -->
        <div
          class="mt-5"
          style="font-size: 0.85rem;color: rgba(0, 0, 0, .7);"
        >商品分类</div>
        <el-select
          multiple
          class="w-full"
          placeholder="请选择分类"
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

        <!-- 价格 -->
        <vs-input
          class="mt-5 w-full"
          label="价格"
          icon="attach_money"
          v-model="price"
        />
      </div>
    </VuePerfectScrollbar>

    <div
      slot="footer"
      class="flex flex-wrap items-center p-6 text-sm"
    >
      <vs-button
        v-if="this.title === '添加求购信息'"
        class="mr-2"
        @click="onPublish()"
      >确认添加</vs-button>
      <vs-button
        type="flat"
        color="danger"
        @click="$emit('closeSidebar')"
      >取消操作</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'AddNewDataSidebar',
  components: { VuePerfectScrollbar },

  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    // 侧边栏标题
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
    price: '',
  }),

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

    categoryList() {
      return this.$store.state.categoryList
    },
  },

  watch: {
    isSidebarActive(flag) {
      if (flag) {
        this.name = ''
        this.category = []
        this.price = ''
      }
    },
  },

  methods: {
    verification() {
      if (
        this.name.length > 0
        && this.category.length > 0
        && this.price.length > 0
      ) {
        return true
      }
      return false
    },

    // 发布求购
    onPublish() {
      if (this.verification()) {
        const data = {
          name: this.name,
          category: this.category,
          price: this.price,
          time: this.$dayjs().format('YY-MM-DD HH:mm:ss'),
        }
        this.$emit('addListData', data)
        this.$emit('closeSidebar')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-main::v-deep {
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

.scroll-area {
  height: calc(100% - 4rem);
}

.el-select::v-deep {
  .el-input__inner {
    padding-left: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>

<style>
.el-select-dropdown {
  z-index: 52012 !important;
}
</style>