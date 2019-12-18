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
              class="item px-3 py-1 cursor-pointer hover:text-blue-500"
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
      <div class="p-4 bg-white rounded-lg">
        <ul v-if="dataList.length > 0">
          <li
            v-contextmenu:contextmenu
            class="mb-3 p-2 rounded-lg hover:bg-gray-100"
            v-for="(item, i) in dataList"
            :key="i"
            :data-id="item._id"
          >
            <div class="mb-2 flex items-center">
              <vs-icon
                size="small"
                :icon="noticeType[item.type].icon"
                :color="noticeType[item.type].color"
              ></vs-icon>
              <span
                class="ml-2"
                :class="`text-${noticeType[item.type].color}`"
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
import { getNoticeList, deleteNotice } from '@/request/api/notice'

export default {
  name: 'Message',
  data: () => ({
    list: [
      {
        title: '系统通知',
      },
      {
        title: '我的消息',
      },
    ],
    noticeType: {
      1: { icon: 'chat_bubble_outline', color: 'primary' },
      2: { icon: 'done_outline', color: 'success' },
      3: { icon: 'help_outline', color: 'warning' },
      4: { icon: 'error_outline', color: 'danger' },
    },
    deleteId: null,
    dataList: [],
    currentActive: '系统通知',
  }),

  created() {
    this.getNoticeList()
  },

  methods: {
    async getNoticeList() {
      const { code, data } = await getNoticeList()
      if (code === 2000) {
        this.dataList = data.notice_list.reverse()
      }
    },

    async deleteNotice() {
      const { code } = await deleteNotice({ notice_id: this.deleteId })
      if (code === 2000) {
        this.dataList.forEach((el, i) => {
          if (el._id === this.deleteId) {
            this.dataList.splice(i, 1)
          }
        })
        this.$vs.notify({
          color: 'success',
          title: '成功',
          text: '已删除一条通知',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  transition: color 0.3s;
}
</style>
