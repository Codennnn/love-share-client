<template>
  <vs-dropdown vs-custom-content>
    <el-badge :value="noticeAmount > 0 ? noticeAmount : ''">
      <i class="nav-icon el-icon-bell"></i>
    </el-badge>
    <vs-dropdown-menu
      id="div-with-loading"
      class="menu-box"
    >
      <div
        class="w-full table text-center text-white bg-primary cursor-pointer"
        style="height: 65px;"
        @mouseover="showRefresh = true"
        @mouseout="showRefresh = false"
      >
        <div
          class="table-cell"
          style="vertical-align: middle;"
          @click="noticesRefresh"
        >
          <div class="text-xl">收到 {{ noticeAmount }} 条新通知</div>
          <div
            class="text-sm text-gray-300"
            v-show="showRefresh"
          >点击刷新</div>
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
          v-if="noticeAmount > 0"
        >
          <li
            class="notice flex justify-between p-4
                    cursor-pointer hover:bg-gray-200"
            style="transition: all 0.3s;"
            v-for="(nt, i) in noticeList"
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
        class="w-full p-2 text-center text-primary
                cursor-pointer font-semibold bg-gray-100 hover:bg-gray-200"
        style="transition: all 0.3s;"
        @click="$router.push('/message')"
      >
        <span>查看全部通知</span>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>


<script>

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapState, mapGetters } from 'vuex'
import { timeDiff } from '@/utils/util'

const noticeType = {
  0: { icon: 'chat_bubble_outline', color: 'primary' },
  1: { icon: 'done_outline', color: 'success' },
  2: { icon: 'help_outline', color: 'warning' },
  3: { icon: 'error_outline', color: 'danger' },
}

export default {
  name: 'Notice',
  components: { VuePerfectScrollbar },

  data: () => ({
    timeDiff,
    noticeType,
    showRefresh: false,
  }),

  created() {
    this.getNoticeList()
  },

  computed: {
    ...mapState('notice', ['noticeList']),
    ...mapGetters('notice', ['noticeAmount']),
  },

  methods: {
    // 获取购物车
    async getNoticeList() {
      await this.$store.dispatch('notice/getNoticeList')
    },

    // 刷新通知
    async noticesRefresh() {
      this.$vs.loading({
        type: 'point',
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        await this.getNoticeList()
      } catch { //
      } finally {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }
    },
  },
}
</script>
