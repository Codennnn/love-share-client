<template>
  <div>
    123
  </div>
</template>

<script>
import { getGoodsDetail } from '@/request/api/goods'

export default {
  name: 'GoodsDetail',
  data: () => ({
  }),

  mounted() {
  },

  methods: {
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail()
      if (code === 2000) {
        this.detail = data.detail
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
