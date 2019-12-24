<template>
  <div class="p-6 bg-white rounded-lg">
    <vs-table
      search
      pagination
      noDataText="暂无数据"
      :max-items="5"
      :data="collections"
    >
      <div
        slot="header"
        class="p-2 flex items-center"
      >
        <vs-button
          radius
          type="flat"
          color="#999"
          icon="arrow_back"
          @click="$router.go(-1)"
        ></vs-button>
        <p class="ml-2 font-bold text-gray-600">收藏夹</p>
      </div>

      <template slot="thead">
        <vs-th>商品名称</vs-th>
        <vs-th>求购价</vs-th>
        <vs-th>收藏于</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
        >
          <vs-td>{{ tr.goods.name }}</vs-td>
          <vs-td>
            <p class="text-gray-600 font-bold">￥{{ Number(tr.goods.price).toFixed(2) }}</p>
          </vs-td>
          <vs-td>
            <p class="text-gray-600">{{ timeDiff(tr.created_at) }}</p>
          </vs-td>
          <vs-td>
            <i class="el-icon-more-outline"></i>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { timeDiff } from '@/utils/util'

import { getCollectionList } from '@/request/api/user'

export default {
  name: 'UserCollections',
  data: () => ({
    timeDiff,
    collections: [],
  }),

  created() {
    this.getCollectionList()
  },

  methods: {
    async getCollectionList() {
      const { code, data } = await getCollectionList()
      if (code === 2000) {
        this.collections = data.collections
      }
    },
  },
}
</script>
