<template>
  <vs-dropdown vs-custom-content>
    <el-badge :value="unreadAmount > 0 ? unreadAmount : ''">
      <i class="nav-icon el-icon-bell"></i>
    </el-badge>
    <vs-dropdown-menu
      id="div-with-loading"
      class="menu-box"
    >
      <div
        class="w-full table text-center text-white bg-primary cursor-pointer"
        style="height: 65px;"
      >
        <div
          class="table-cell"
          style="vertical-align: middle;"
          @click="noticesRefresh()"
        >
          <div
            title="点击刷新 (=・ω・=)"
            class="text-xl"
          >收到 {{ unreadAmount }} 条未读通知</div>
          <div class="text-sm text-gray-300"></div>
        </div>
      </div>
      <VuePerfectScrollbar
        style="height: 350px;"
        :settings="{
          maxScrollbarLength: 160,
          wheelSpeed: 0.60,
        }"
      >
        <ul
          class="vs-con-loading__container"
          v-if="unreadAmount > 0"
        >
          <li
            class="notice relative flex justify-between p-4
                    cursor-pointer hover:bg-gray-200"
            style="transition: all 0.3s;"
            v-for="(nt, i) in unreadNoticesReverse"
            :key="i"
          >
            <div class="flex items-start">
              <vs-icon
                size="small"
                :icon="noticeType[nt.type].icon"
                :color="noticeType[nt.type].color"
              ></vs-icon>
              <div class="mx-2">
                <div>
                  <span
                    class="font-medium block"
                    :class="[`text-${noticeType[nt.type].color}`]"
                  >{{ nt.title }}</span>
                  <small class="notice-content">{{ nt.content }}</small>
                </div>
              </div>
            </div>
            <small
              class="whitespace-no-wrap"
              style="color: #989898;"
            >{{ timeDiff(nt.time) }}</small>
            <i
              title="不再通知"
              class="read el-icon-close-notification absolute bottom-0 mr-3 mb-1 text-lg
              text-sm text-gray-500 hover:text-blue-500"
              @click="setNoticeRead(nt._id)"
            ></i>
          </li>
        </ul>
        <div
          class="h-full flex flex-col items-center justify-center"
          v-else
        >
          <vs-icon
            size="80px"
            icon="blur_on"
            color="#718096"
          ></vs-icon>
          <div class="mt-4 text-gray-600 text-sm">暂无更多新的通知</div>
        </div>
      </VuePerfectScrollbar>
      <div
        class="w-full py-2 px-4 flex justify-between items-center text-sm
        bg-gray-100 hover:bg-gray-200"
        style="transition: all 0.3s;"
      >
        <span
          class="text-gray-600 cursor-pointer"
          @click="setAllNoticesRead()"
        >全部已读</span>
        <span
          class="text-primary cursor-pointer"
          @click="$router.push('/message')"
        >查看全部通知</span>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapGetters } from 'vuex'

import { setNoticeRead, setAllNoticesRead } from '@/request/api/notice'
import { timeDiff } from '@/utils/util'

const noticeType = {
  1: { icon: 'chat_bubble_outline', color: 'primary' },
  2: { icon: 'done_outline', color: 'success' },
  3: { icon: 'help_outline', color: 'warning' },
  4: { icon: 'error_outline', color: 'danger' },
}

export default {
  name: 'Notice',
  components: { VuePerfectScrollbar },

  data: () => ({
    timeDiff,
    noticeType,
  }),

  created() {
    this.getUnreadNotices()
  },

  mounted() {
    this.sockets.subscribe(`receiveNotice${this.userId}`, (notice) => {
      this.$message({
        showClose: true,
        duration: 2000,
        message: '收到一条新的通知，请注意查看',
      })
      this.$store.commit('notice/ADD_UNREAD_ITEM', notice)
    })
  },

  computed: {
    ...mapGetters('user', { userId: 'getUserId' }),
    ...mapGetters('notice', ['unreadAmount', 'unreadNoticesReverse']),
  },

  methods: {
    // 获取购物车
    async getUnreadNotices() {
      await this.$store.dispatch('notice/getUnreadNotices')
    },

    // 刷新通知
    async noticesRefresh() {
      this.$vs.loading({
        type: 'point',
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        await this.getUnreadNotices()
      } finally {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }
    },

    async setNoticeRead(notice_id) {
      const { code } = await setNoticeRead({ notice_id })
      if (code === 2000) {
        this.$store.commit('notice/REMOVE_UNREAD_ITEM', notice_id)
      }
    },

    async setAllNoticesRead() {
      const noticeIdList = this.unreadNoticesReverse.map(el => el._id)
      const { code } = await setAllNoticesRead({ notice_id_list: noticeIdList })
      if (code === 2000) {
        this.$store.commit('notice/SET_UNREAD_NOTICES', [])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.notice {
  .read {
    right: -30px;
    transition: all 0.2s;
  }
  &:hover {
    .read {
      right: 0;
    }
  }
}
</style>
