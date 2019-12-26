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
    <div
      id="sidebar-container"
      class="vs-con-loading__container"
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
            val-icon-danger="clear"
            label="昵称"
            v-model="data.nickname"
            :danger="error1"
            :danger-text="errorText1"
            @focus="error1 = false"
          />

          <!-- 真实姓名 -->
          <vs-input
            class="mt-5 w-full"
            val-icon-danger="clear"
            label="真实姓名"
            v-model="data.real_name"
            :danger="error2"
            :danger-text="errorText2"
            @focus="error2 = false"
          />

          <!-- 邮箱 -->
          <vs-input
            class="mt-5 w-full"
            label="邮箱"
            placeholder="请填写邮箱"
            v-model="data.email"
          />

          <!-- QQ -->
          <vs-input
            class="mt-5 w-full"
            label="QQ"
            placeholder="请填写QQ"
            v-model="data.qq"
          />

          <!-- 微信 -->
          <vs-input
            class="my-5 w-full"
            label="微信"
            placeholder="请填写微信"
            v-model="data.wechat"
          />

          <!-- 学校 -->
          <span
            class="ml-1 text-sm"
            style="color: rgba(0, 0, 0, .7)"
          >学校</span>
          <el-select
            class="w-full"
            v-model="data.school"
            popper-class="el-options"
          >
            <el-option
              v-for="(item, i) in schoolList"
              :key="i"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>

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

          <vs-textarea
            class="mt-8"
            rows="4"
            counter="120"
            maxlength="120"
            label="个人简介"
            v-model="data.introduction"
            :counter-danger.sync="counterDanger"
          />
        </div>
      </VuePerfectScrollbar>

      <div
        class="flex flex-wrap items-center p-6 text-sm"
        slot="footer"
      >
        <vs-button
          class="mr-4"
          @click="onModify()"
        >确认更新</vs-button>
        <vs-button
          slot="reference"
          type="border"
          color="danger"
          @click="onCancel()"
        >取消操作</vs-button>
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import _cloneDeepWith from 'lodash/cloneDeepWith'

import { modifyUser } from '@/request/api/user'
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
    error1: false, // 昵称错误
    errorText1: '', // 昵称错误信息
    error2: false, // 真实姓名错误
    errorText2: '', // 真实姓名错误信息
    counterDanger: true,
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
          if (it.name === this.data.school.name) {
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

    async onModify() {
      if (!/^[\d\w\u4e00-\u9fa5,.;:"'?!-]{2,8}$/.test(this.data.nickname)) {
        this.error1 = true
        this.errorText1 = '昵称格式只能是中文、字母、数字组成'
        return
      }
      if (!/^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(this.data.real_name)) {
        this.error2 = true
        this.errorText2 = '真实姓名格式不正确'
        return
      }

      this.$vs.loading({
        container: '#sidebar-container',
        scale: 1,
      })

      try {
        const { code, msg } = await modifyUser(this.data)
        if (code === 2000) {
          await this.$store.dispatch('user/getUserInfo')
          this.onCancel()
          this.$vs.notify({
            time: 3000,
            title: '操作成功',
            text: '已更新您的个人信息',
            color: 'success',
            icon: 'check_box',
          })
        } else if (code === 4003) {
          this.error = true
          this.errorText = '昵称已被使用'
        } else {
          throw new Error(msg)
        }
      } catch (err) {
        this.onCancel()
        this.$vs.notify({
          time: 3000,
          title: '操作失败',
          color: 'danger',
          text: err,
        })
      } finally {
        this.$vs.loading.close('#sidebar-container > .con-vs-loading')
      }
    },

    onCancel() {
      this.isSidebarActiveLocal = false
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
    .el-input__inner {
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
}

.scroll-area {
  height: calc(100vh - 10rem);
}
</style>

<style lang="scss">
.el-options {
  z-index: 52012 !important;
  .el-scrollbar__bar.is-horizontal {
    display: none !important;
  }
}
</style>
