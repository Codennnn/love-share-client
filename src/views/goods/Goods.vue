<template>
  <div>
    <div class="flex items-center">
      <div class="w-1/4">
        <div>平台商品123465</div>
        <div>2300</div>
      </div>
      <div class="w-1/4">平台商品123465</div>
      <div class="w-2/4">平台商品123465</div>
    </div>
    <div
      id="table-loading"
      class="vs-con-loading__container"
    >
      <vs-table
        pagination
        max-items="10"
        noDataText="暂无数据"
        :data="goods"
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
                @keyup.enter="onSearch"
              />
            </div>
          </div>
        </template>
        <template slot="thead">
          <vs-th>商品名称</vs-th>
          <vs-th>卖家昵称</vs-th>
          <vs-th>价格</vs-th>
          <vs-th>订单编号</vs-th>
          <vs-th>序号</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
            :data="tr"
          >
            <vs-td :data="data[i].name">
              {{data[i].name}}
            </vs-td>

            <vs-td :data="data[i].nickname">
              {{data[i].nickname}}
            </vs-td>

            <vs-td
              class="font-semibold"
              :data="data[i].price"
            >
              ￥{{data[i].price}}
            </vs-td>

            <vs-td :data="data[i].order_id">
              {{data[i].order_id}}
            </vs-td>

            <vs-td :data="data[i].id">
              {{data[i].id}}
            </vs-td>

            <template slot="expand">
              <div class="flex w-full">
                <div class="w-1/6">
                  <div class="text-center">
                    <vs-avatar
                      size="45px"
                      :src="tr.avatar_url"
                    />
                    <div class="ml-3">
                      <div class="text-base font-semibold">{{ tr.nickname }}</div>
                      <div>{{ tr.real_name }}</div>
                    </div>
                  </div>
                </div>
                <vs-list class="w-5/12">
                  <vs-list-header
                    class="text-base"
                    title="卖家信息"
                    color="success"
                  ></vs-list-header>
                  <vs-list-item
                    icon="mail"
                    title="Email"
                    :subtitle="tr.email"
                  ></vs-list-item>
                  <vs-list-item
                    icon="check"
                    title="Website"
                    :subtitle="tr.website"
                  ></vs-list-item>
                </vs-list>
                <vs-list class="w-5/12">
                  <vs-list-header
                    class="text-base"
                    title="商品信息"
                    color="warning"
                  ></vs-list-header>
                  <vs-list-item
                    icon="mail"
                    title="订单编号"
                    :subtitle="tr.order_id"
                  >
                    <vs-button
                      color="#646464"
                      type="flat"
                      v-clipboard:copy="tr.order_id"
                      v-clipboard:success="onCopy"
                    >复制</vs-button>
                  </vs-list-item>
                  <vs-list-item
                    icon="check"
                    title="发布时间"
                    :subtitle="tr.time"
                  >
                    <vs-button type="flat">查看订单详情</vs-button>
                  </vs-list-item>
                </vs-list>
              </div>
            </template>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import { getGoods } from '@/request/api/goods'

export default {
  data: () => ({
    searchText: '',
    goods: [],
  }),

  mounted() {
    this.getGoods()
  },

  methods: {
    async getGoods() {
      this.$vs.loading({
        type: 'point',
        container: '#table-loading',
        scale: 1,
      })
      const { code, goods } = await getGoods()
      if (code === 2000) {
        this.goods = goods
      }
      this.$vs.loading.close('#table-loading > .con-vs-loading')
    },

    onSearch() {
      this.getGoods()
    },

    onCopy(e) {
      this.$message(`已复制订单编号：${e.text}  🎉`)
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
