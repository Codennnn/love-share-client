<template>
  <vs-dropdown vs-custom-content>
    <el-badge
      class="mt-1"
      :value="unreadAmount > 0 ? unreadAmount : ''"
    >
      <feather
        class="nav-icon"
        type="bell"
      ></feather>
    </el-badge>
    <vs-dropdown-menu
      id="div-with-loading"
      class="menu-box"
    >
      <div
        title="点击刷新 (=・ω・=)"
        class="w-full flex-row-center text-white text-xl bg-primary cursor-pointer"
        style="height: 65px;"
        @click="noticesRefresh()"
      >
        收到 {{ unreadAmount }} 条未读通知
      </div>
      <VuePerfectScrollbar
        style="height: 350px;"
        :settings="{
          maxScrollbarLength: 160,
          wheelSpeed: 0.60,
        }"
      >
        <ul
          v-if="unreadAmount > 0"
          class="vs-con-loading__container"
        >
          <li
            class="notice relative p-4 flex justify-between transition
                    cursor-pointer hover:bg-gray-200"
            v-for="(nt, i) in unreadNotices"
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
                  <div
                    class="content text-sm text-gray-600"
                    v-html="nt.content"
                  ></div>
                </div>
              </div>
            </div>
            <small
              class="whitespace-no-wrap"
              style="color: #989898;"
            >{{ $timeDiff(nt.time) }}</small>
            <feather
              title="不再通知"
              class="read absolute text-gray-500"
              type="bell-off"
              size="15"
              @click="setNoticeRead(nt._id)"
            ></feather>
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
      <div class="w-full py-2 px-4 flex justify-between items-center text-sm
        transition bg-gray-100 hover:bg-gray-200">
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
import { mapState, mapGetters } from 'vuex'

import { setNoticeRead, setAllNoticesRead } from '@/request/api/notice'

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
    noticeType,
  }),

  created() {
    this.getUnreadNotices()
  },

  mounted() {
    this.sockets.subscribe(`receiveNotice${this.userId}`, () => {
      this.$vs.notify({
        title: '消息提醒',
        text: '收到一条新的通知，请注意查看',
        icon: 'chat',
        position: 'top-right',
      })
      this.$store.dispatch('notice/getUnreadNotices')
    })
  },

  computed: {
    ...mapState('notice', ['unreadNotices']),
    ...mapGetters('user', ['userId']),
    ...mapGetters('notice', ['unreadAmount']),
  },

  methods: {
    // 获取未读通知
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
      if (this.unreadNotices.length > 0) {
        const noticeIdList = this.unreadNotices.map(el => el._id)
        const { code } = await setAllNoticesRead({ notice_id_list: noticeIdList })
        if (code === 2000) {
          this.$store.commit('notice/SET_UNREAD_NOTICES', [])
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.notice {
  .read {
    right: -30px;
    bottom: 15px;
    transition: all 0.2s;
    opacity: 0;
  }
  &:hover {
    .read {
      right: 15px;
      opacity: 1;
    }
  }
  .content {
    @include textOverflow($width: 240px, $line: 2);
  }
}
</style>
