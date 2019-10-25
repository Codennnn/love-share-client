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
      <span class="text-lg">编辑资料</span>
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
        <!-- 昵称 -->
        <vs-input
          class="mt-5 w-full"
          label="昵称"
          v-model="info.nickname"
        />

        <!-- QQ -->
        <vs-input
          class="mt-5 w-full"
          label="QQ"
          v-model="info.qq"
        />

        <!-- 微信 -->
        <vs-input
          class="mt-5 w-full"
          label="微信"
          v-model="info.wechat"
        />

        <!-- 学校 -->
        <vs-select
          class="mt-5 w-full"
          label="学校"
          v-model="info.school.value"
        >
          <vs-select-item
            v-for="item in schools"
            :key="item.value"
            :value="item.value"
            :text="item.label"
          />
        </vs-select>

        <div class="mt-6 pl-1">
          <div
            class="mb-2 text-sm"
            style="color: rgba(0, 0, 0, 0.6);"
          >性别</div>
          <div class="flex">
            <vs-radio
              class="mr-4"
              v-model="info.gender"
              vs-value="1"
            >男</vs-radio>
            <vs-radio
              v-model="info.gender"
              vs-value="0"
            >女</vs-radio>
          </div>
        </div>

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
      <vs-button class="mr-6">确认更新</vs-button>
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

import { getSchools } from '@/request/api/common'

export default {
  name: 'EditUserInfo',
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    schools: [],
    settings: {
      maxScrollbarLength: 180,
      wheelSpeed: 0.60,
    },
  }),

  components: { VuePerfectScrollbar },

  mounted() {
    console.log(this.info.school)
    this.getSchools()
  },

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
      this.$refs.fileUpload.srcs = []
    },

    async getSchools() {
      try {
        const { code, data } = await getSchools()
        if (code === 2000) {
          this.schools = data.schools
        }
      } catch {
        // TODO
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
</style>

<style lang="scss">
.vs-select--options {
  z-index: 52011;
}
</style>
