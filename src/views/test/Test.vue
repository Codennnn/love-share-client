<template>
  <div v-show="dataList.length > 0">
    <ul
      v-infinite-scroll="loadMore"
      style="height: 100px; overflow:auto;"
    >
      <li
        v-for="i in count"
        :key="i"
      >{{ i }}</li>
    </ul>
  </div>
</template>

<script>
import {
  getNoticeList,
} from '@/request/api/notice'

export default {
  data() {
    return {
      dataList: [],
      count: 6,
    }
  },

  mounted() {
    this.getNoticeList()
  },

  methods: {
    // 获取通知列表
    async getNoticeList() {
      try {
        const { code, data } = await getNoticeList()
        if (code === 2000) {
          this.rawData = data.notice_list
          this.dataList = data.notice_list.reverse()
        }
      } finally {
        //
      }
    },

    loadMore() {
      this.count += 2
    },
  },
}
</script>
