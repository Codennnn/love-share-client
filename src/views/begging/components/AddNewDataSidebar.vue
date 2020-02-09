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
      <span class="text-lg">添加求购信息</span>
      <i
        class="el-icon-close text-2xl font-bold cursor-pointer"
        @click.stop="$emit('closeSidebar')"
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
          v-model="payload.name"
        />

        <!-- 描述 -->
        <vs-textarea
          class="mt-6"
          label="具体描述"
          maxlength="150"
          counter="150"
          v-model="payload.description"
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
          v-model="payload.category"
          :multiple-limit="2"
        >
          <el-option
            v-for="(it, i) in categoryList"
            :key="i"
            :label="it.name"
            :value="it._id"
          >
          </el-option>
        </el-select>

        <!-- 价格 -->
        <p
          class="mt-5 text-sm"
          style="color: rgba(0, 0, 0, .7);"
        >价格区间</p>
        <div class="flex items-center">
          <vs-input
            icon="attach_money"
            v-model.number="payload.min_price"
          />
          <i class="el-icon-minus mx-1"></i>
          <vs-input
            icon="attach_money"
            v-model.number="payload.max_price"
          />
        </div>
        <vs-alert
          class="mt-5"
          closable
          color="danger"
          :active.sync="showAlert"
        >
          填写的数据不符合规范，请修改后再提交！
        </vs-alert>
      </div>
    </VuePerfectScrollbar>

    <div
      slot="footer"
      class="p-6 text-sm"
    >
      <vs-button
        class="mr-2"
        :disabled="disabled"
        @click="onPublish()"
      >确认添加</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { addBegging } from '@/request/api/begging'

export default {
  name: 'AddNewDataSidebar',
  components: { VuePerfectScrollbar },

  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    disabled: false,
    showAlert: false,
    payload: {
      name: '',
      category: [],
      description: '',
      min_price: 0,
      max_price: 0,
    },
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
        this.payload.name.length > 0
        && this.payload.category.length > 0
        && this.payload.min_price <= this.payload.max_price
      ) {
        return true
      }
      return false
    },

    // 发布求购
    async onPublish() {
      if (this.verification()) {
        this.disabled = true
        try {
          const { code } = await addBegging(this.payload)
          if (code === 2000) {
            this.$vs.notify({
              title: '添加成功',
              text: '成功添加一条求购商品信息',
              color: 'success',
              time: 3000,
            })
            this.$emit('closeSidebar')
            this.$emit('refreshData')
          } else {
            throw new Error()
          }
        } finally {
          this.disabled = false
        }
      } else {
        this.showAlert = true
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
