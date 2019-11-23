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
        @click.stop="onCancel()"
      ></i>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar
      class="scroll-area pt-4 pb-6"
      v-if="data"
      :settings="{
        maxScrollbarLength: 180,
        wheelSpeed: 0.60,
      }"
    >
      <div class="p-6">
        <!-- 昵称 -->
        <vs-input
          class="mt-5 w-full"
          label="昵称"
          v-model="data.nickname"
        />

        <!-- QQ -->
        <vs-input
          class="mt-5 w-full"
          label="QQ"
          v-model="data.qq"
        />

        <!-- 微信 -->
        <vs-input
          class="mt-5 w-full"
          label="微信"
          v-model="data.wechat"
        />

        <!-- 学校 -->
        <vs-select
          class="mt-5 w-full"
          label="学校"
          v-model="data.school"
        >
          <vs-select-item
            v-for="(item, i) in schoolList"
            :key="i"
            :value="item._id"
            :text="item.name"
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
              v-model="data.gender"
              vs-value="1"
            >男</vs-radio>
            <vs-radio
              v-model="data.gender"
              vs-value="2"
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
      <vs-button
        class="mr-6"
        @click="onUpdate()"
      >确认更新</vs-button>
      <el-popover
        width="220"
        trigger="manual"
        v-model="showPopover"
      >
        <p>确定要放弃您已更改的内容吗?</p>
        <div class="mt-3 text-right">
          <vs-button
            type="flat"
            color="dark"
            size="small"
            @click="showPopover = false"
          >取消</vs-button>
          <vs-button
            type="flat"
            color="danger"
            size="small"
            @click="showPopover = false, isSidebarActiveLocal = false"
          >确定</vs-button>
        </div>
        <vs-button
          slot="reference"
          type="border"
          color="danger"
          @click="onCancel()"
        >取消操作</vs-button>
      </el-popover>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import _isEqual from 'lodash/isEqual'
import _cloneDeepWith from 'lodash/cloneDeepWith'

import { getSchoolList } from '@/request/api/common'

export default {
  name: 'EditUserInfo',
  components: { VuePerfectScrollbar },

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
    data: null,
    schoolList: [],
    showPopover: false,
  }),

  created() {
    this.getSchoolList()
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
    isSidebarActive(active) {
      if (active) {
        this.data = _cloneDeepWith(this.info)
        this.schoolList.forEach((it) => {
          if (it.name === this.data.school) {
            this.data.school = it._id
          }
        })
      }
    },
  },

  methods: {
    async getSchoolList() {
      const { code, data } = await getSchoolList()
      if (code === 2000) {
        this.schoolList = data.school_list
      }
    },

    onUpdate() {
      console.log(this.data)
    },

    onCancel() {
      if (_isEqual(this.data, this.info)) {
        this.showPopover = false
        this.isSidebarActiveLocal = false
      } else {
        this.showPopover = true
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

<style>
.vs-select--options,
.el-popover {
  z-index: 52012 !important;
}
</style>
