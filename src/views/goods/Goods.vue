<template>
  <div>
    <div>123465</div>
    <vs-table
      pagination
      max-items="10"
      noDataText="暂无数据"
      :data="goods"
      @selected="handleSelected"
      v-model="selected"
    >
      <template slot="header">
        <div class="w-full flex items-center p-4">
          <div class="text-xl font-semibold">商品列表</div>
          <div class="ml-auto sm:w-1/2 md:w-1/4">
            <vs-input
              class="search-input w-full"
              icon="search"
              placeholder="搜索"
              v-model="searchText"
            />
          </div>
        </div>
      </template>
      <template slot="thead">
        <vs-th>
          Email
        </vs-th>
        <vs-th>
          Name
        </vs-th>
        <vs-th>
          Website
        </vs-th>
        <vs-th>
          Nro
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, indextr) in data"
          :key="indextr"
          :data="tr"
        >
          <vs-td :data="data[indextr].email">
            {{data[indextr].email}}
          </vs-td>

          <vs-td :data="data[indextr].username">
            {{data[indextr].name}}
          </vs-td>

          <vs-td :data="data[indextr].website">
            {{data[indextr].website}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].id}}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { getGoods } from '@/request/api/goods'

export default {
  data: () => ({
    selected: [],
    searchText: '',
    goods: [],
  }),

  mounted() {
    this.getGoods()
  },

  methods: {
    async getGoods() {
      const { code, goods } = await getGoods()
      if (code === 2000) {
        this.goods = goods
      }
    },

    handleSelected(tr) {
      console.log(tr)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input {
  // 重设输入框样式
  &::v-deep {
    .vs-inputx {
      padding-left: 35px;
    }
    .vs-icon {
      top: 0.6rem;
      font-size: 20px;
    }
  }
}
</style>
