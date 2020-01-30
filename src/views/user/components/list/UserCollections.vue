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
          class="text-xl"
          type="flat"
          color="#999"
          icon="arrow_back"
          @click="$router.go(-1)"
        ></vs-button>
        <p class="ml-1 font-bold text-gray-600">收藏夹</p>
      </div>

      <template slot="thead">
        <vs-th>图片</vs-th>
        <vs-th>商品名称</vs-th>
        <vs-th>求购价</vs-th>
        <vs-th>收藏于</vs-th>
        <vs-th>操作</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
        >
          <vs-td>
            <vs-image
              class="w-24 h-24 base-shadow"
              :src="`${tr.goods.img_list[0]}?imageView2/2/w/100`"
            ></vs-image>
          </vs-td>
          <vs-td>{{ tr.goods.name }}</vs-td>
          <vs-td>
            <p class="text-gray-600 font-bold">￥{{ Number(tr.goods.price).toFixed(2) }}</p>
          </vs-td>
          <vs-td>
            <p class="text-gray-600">{{ $timeDiff(tr.created_at) }}</p>
          </vs-td>
          <vs-td>
            <div class="flex">
              <div
                v-if="isInCollections(tr.goods._id)"
                class="py-2 flex justify-center items-center bg-gray-100 cursor-pointer rounded-lg"
                style="width: 7.5rem;"
                @click="deleteCollection(tr.goods._id)"
              >
                <i class="el-icon-star-on text-warning text-xl"></i>
                <p class="ml-1 text-gray-600">取消收藏</p>
              </div>
              <div
                v-else
                class="py-2 flex justify-center items-center bg-gray-100 cursor-pointer rounded-lg"
                style="width: 7.5rem;"
                @click="addCollection(tr.goods._id)"
              >
                <i class="el-icon-star-off text-gray-600 text-lg"></i>
                <p class="ml-2 text-gray-600">收藏</p>
              </div>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import Vue from 'vue'

import { getCollectionList, addCollection, deleteCollection } from '@/request/api/user'

export default {
  name: 'UserCollections',
  data: () => ({
    collections: [],
    ids: {},
  }),

  computed: {
    isInCollections() {
      return id => Object.prototype.hasOwnProperty.call(this.ids, id)
    },
  },

  created() {
    this.getCollectionList()
  },

  methods: {
    // 获取收藏列表
    async getCollectionList() {
      const { code, data } = await getCollectionList()
      if (code === 2000) {
        data.collections.forEach((el) => {
          this.ids[el.goods._id] = el.goods._id
        })
        this.collections = data.collections
      }
    },

    // 收藏商品
    async addCollection(goods_id) {
      const { code } = await addCollection({ goods_id })
      if (code === 2000) {
        Vue.set(this.ids, goods_id)
      }
    },

    // 取消收藏商品
    async deleteCollection(goods_id) {
      const { code } = await deleteCollection({ goods_id })
      if (code === 2000) {
        Vue.delete(this.ids, goods_id)
      }
    },
  },
}
</script>
