<template>
  <vs-sidebar
    spacer
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
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
          name="name"
          v-model="name"
        />

        <!-- 分类 -->
        <vs-select
          class="mt-5 w-full"
          label="分类"
          v-model="category"
        >
          <vs-select-item
            :key="item.value"
            :value="item.value"
            :text="item.text"
            v-for="item in category_choices"
          />
        </vs-select>

        <!-- 价格 -->
        <vs-input
          class="mt-5 w-full"
          label="价格"
          icon="attach_money"
          name="price"
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
  },

  data: () => ({
    name: '',
    category: 'audio',
    order_status: 'pending',
    price: '',

    category_choices: [
      { text: 'Audio', value: 'audio' },
      { text: 'Computers', value: 'computers' },
      { text: 'Fitness', value: 'fitness' },
      { text: 'Appliance', value: 'appliance' },
    ],
    order_status_choices: [
      { text: 'Pending', value: 'pending' },
      { text: 'Canceled', value: 'canceled' },
      { text: 'Delivered', value: 'delivered' },
      { text: 'On Hold', value: 'on_hold' },
    ],
    settings: {
      maxScrollbarLength: 180,
      wheelSpeed: 0.60,
    },
  }),

  components: { VuePerfectScrollbar },

  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar')
          this.initValues()
        }
      },
    },
  },

  methods: {
    initValues() {
      this.name = ''
      this.category = 'audio'
      this.order_status = 'pending'
      this.price = '0'
      this.$refs.fileUpload.srcs = []
    },
  },
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
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
</style>

<style lang="scss">
.vs-select--options {
  z-index: 52011;
}
</style>
