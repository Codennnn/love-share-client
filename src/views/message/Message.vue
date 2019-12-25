<template>
  <div class="flex">
    <div class="w-1/4 pr-5">
      <div class="p-2 bg-white rounded-lg">
        <div class="p-1">
          <div
            class="py-3 text-primary text-lg font-bold cursor-default"
            style="box-shadow: 0 7px 7px -5px rgba(0, 0, 0, 0.08)"
          >消息中心</div>
          <ul class="pt-4">
            <li
              class="item px-3 py-1 cursor-pointer"
              v-for="(item, i) in list"
              :key="i"
              :class="{'text-primary': currentActive === item.title}"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-3/4">
      <div
        id="message-with-loading"
        class="p-4 bg-white rounded-lg vs-con-loading__container"
      >
        <div class="mb-4 flex items-center justify-end">
          <el-dropdown
            class="mr-auto"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{ label }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{label: '全部消息', type: 0}"
                icon=""
              >全部消息</el-dropdown-item>
              <el-dropdown-item
                :command="{label: '系统消息', type: 1}"
                icon="el-icon-chat-square"
              >系统</el-dropdown-item>
              <el-dropdown-item
                :command="{label: '成功消息', type: 2}"
                icon="el-icon-check"
              >成功</el-dropdown-item>
              <el-dropdown-item
                :command="{label: '提示消息', type: 3}"
                icon="el-icon-news"
              >提示</el-dropdown-item>
              <el-dropdown-item
                :command="{label: '重要消息', type: 4}"
                icon="el-icon-warning-outline"
              >重要</el-dropdown-item>
              <el-dropdown-item
                :command="{label: '未读消息', type: 5}"
                icon="el-icon-bell"
              >未读</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="relative flex items-center">
            <div
              class="action-line absolute flex items-center text-xl text-gray-500 bg-gray-100"
              :class="{'show': showAction}"
            >
              <vs-checkbox
                title="全选"
                v-model="selectAll"
              ></vs-checkbox>
              <i
                title="设为已读"
                class="el-icon-finished mx-2 cursor-pointer"
                @click="setAllNoticesRead()"
              ></i>
              <i
                title="删除"
                class="el-icon-delete mx-2 cursor-pointer"
                @click="deleteManyNotices()"
              ></i>
              <i
                title="关闭"
                class="el-icon-close cursor-pointer"
                @click="showAction = false"
              ></i>
            </div>
            <vs-icon
              v-show="!showAction"
              class="mx-1 cursor-pointer"
              title="管理"
              size="25px"
              icon="settings_ethernet"
              color="#bbb"
              @click.native="showAction = true"
            ></vs-icon>
          </div>
          <vs-icon
            class="cursor-pointer"
            title="刷新"
            size="25px"
            icon="refresh"
            color="#bbb"
            @click.native="selectAll = false, showAction = false, getNoticeList()"
          ></vs-icon>
        </div>
        <ul v-if="dataList.length > 0">
          <li
            v-contextmenu:contextmenu
            class="mb-3 p-2 flex items-center rounded-lg hover:bg-gray-100"
            style="transition: all 0.3s;"
            v-for="(item, i) in dataList"
            :key="i"
            :data-id="item._id"
          >
            <div class="flex-1">
              <div class="mb-2 flex items-center">
                <vs-icon
                  size="small"
                  :icon="noticeType[item.type].icon"
                  :color="noticeType[item.type].color"
                ></vs-icon>
                <span
                  class="ml-2"
                  :class="[`text-${noticeType[item.type].color}`,
                  {'font-bold': isUnread(item._id)}]"
                >
                  {{ item.title }}
                </span>
                <span
                  class="ml-4 text-gray-500"
                  style="font-size: 0.7rem;"
                >
                  {{ $dayjs(item.time).format('YYYY年MM月DD日 hh:mm') }}
                </span>
              </div>
              <div
                class="px-6 text-gray-600"
                v-html="item.content"
              >
              </div>
            </div>
            <div
              v-show="showCheckBox"
              class="ml-auto"
            >
              <vs-checkbox
                v-model="select"
                :vs-value="item._id"
              ></vs-checkbox>
            </div>
            <v-contextmenu
              ref="contextmenu"
              theme="bright"
              @contextmenu="(e) => { deleteId = e.elm.dataset.id }"
            >
              <v-contextmenu-item @click="deleteNotice()">删除该通知</v-contextmenu-item>
            </v-contextmenu>
          </li>
        </ul>
        <div
          v-else
          class="py-4 flex justify-center"
        >
          <img src="@/assets/images/no-data.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getNoticeList, setAllNoticesRead, deleteNotice, deleteManyNotices,
} from '@/request/api/notice'

const list = [
  {
    title: '系统通知',
  },
  {
    title: '我的消息',
  },
]
const noticeType = {
  1: { icon: 'chat_bubble_outline', color: 'primary' },
  2: { icon: 'done_outline', color: 'success' },
  3: { icon: 'help_outline', color: 'warning' },
  4: { icon: 'error_outline', color: 'danger' },
}

export default {
  name: 'Message',
  data: () => ({
    list,
    noticeType,
    currentActive: '系统通知',
    label: '全部消息',

    rawData: [],
    dataList: [],
    deleteId: null,
    select: [],
    selectAll: false,
    showAction: false,
  }),

  watch: {
    select() {
      if (this.isAllSelect) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    selectAll(val) {
      if (val) {
        this.onSelectAll()
      } else if (this.isAllSelect) {
        this.onCancelSelectAll()
      }
    },
  },

  computed: {
    isAllSelect() {
      return this.dataList.every(el => this.select.includes(el._id))
    },
    showCheckBox() {
      return this.showAction
    },
    isUnread() {
      return id => this.$store.getters['notice/isUnread'](id)
    },
  },

  mounted() {
    this.getNoticeList()
  },

  methods: {
    // 获取通知列表
    async getNoticeList() {
      this.$vs.loading({
        type: 'point',
        container: '#message-with-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getNoticeList()
        if (code === 2000) {
          this.rawData = data.notice_list.reverse()
          this.dataList = data.notice_list.reverse()
        }
      } finally {
        this.$vs.loading.close('#message-with-loading > .con-vs-loading')
      }
    },

    // 多条消息设为已读
    async setAllNoticesRead() {
      if (this.select.length > 0) {
        const { code } = await setAllNoticesRead({ notice_id_list: this.select })
        if (code === 2000) {
          this.$store.dispatch('notice/getUnreadNotices')
          this.$vs.notify({
            title: '已设为已读',
            text: '该消息已被设置为已读消息',
          })
        }
      }
    },

    // 删除消息
    async deleteNotice() {
      const { code } = await deleteNotice({ notice_id: this.deleteId })
      if (code === 2000) {
        this.$store.dispatch('notice/getUnreadNotices')
        this.getNoticeList()
      }
    },

    // 删除多条消息
    async deleteManyNotices() {
      if (this.select.length > 0) {
        const { code } = await deleteManyNotices({ notice_id_list: this.select })
        if (code === 2000) {
          this.$store.dispatch('notice/getUnreadNotices')
          this.handleCommand({ label: '全部消息' })
          await this.getNoticeList()
          this.selectAll = false
        }
      }
    },

    // 选择全部
    onSelectAll() {
      this.select = this.dataList.map(el => el._id)
    },

    // 取消选择全部
    onCancelSelectAll() {
      this.select = []
    },

    handleCommand({ label, type }) {
      this.label = label
      if (type === 0) {
        this.dataList = this.rawData
      } else if (type === 5) {
        this.rawData.filter(el => !el.is_read)
      } else {
        this.dataList = this.rawData.filter(el => el.type === type)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  transition: color 0.3s;
  &:hover {
    color: rgba(var(--vs-primary), 0.8);
  }
}

.action-line {
  z-index: 999;
  top: 50%;
  right: 0;
  max-width: 0;
  height: 35px;
  line-height: 35px;
  transform: translateY(-50%);
  transition: all 0.4s;
  border-radius: 1rem;
  overflow: hidden;
  opacity: 0;
  &.show {
    opacity: 1;
    max-width: 150px;
    padding: 0 0.6rem;
  }
}
</style>
