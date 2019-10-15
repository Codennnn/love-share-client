<template>
  <div>
    <div class="flex mt-3 mb-6">
      <div
        class="w-1/4 mr-5 lg:px-6 px-3 flex items-center justify-between rounded-lg
      bg-white cursor-pointer hover:shadow-lg"
        style="transition: all 0.3s;"
        @click="getAddedGoods(), tableTitle = '已上架商品'"
      >
        <div class="">
          <div class="text-3xl">{{ count.toLocaleString() }}</div>
          <div class="text-gray-600">已上架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-primary), 0.2)"
        >
          <i class="el-icon-goods p-2 text-3xl text-primary"></i>
        </div>
      </div>
      <div
        class="w-1/4 mr-5 lg:px-6 px-3 flex items-center justify-between rounded-lg
      bg-white cursor-pointer hover:shadow-lg"
        style="transition: all 0.3s;"
        @click="getViolatingGoods(), tableTitle = '违规下架商品'"
      >
        <div>
          <div class="text-3xl">{{ count2.toLocaleString() }}</div>
          <div class="text-gray-600">违规下架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-danger), 0.2)"
        >
          <i class="el-icon-sold-out p-2 text-3xl text-danger"></i>
        </div>
      </div>
      <div class="w-2/4 py-3 px-6 rounded-lg bg-white">
        <div class="mb-3 text-gray-600">高级搜索</div>
        <div>
          <vs-input
            class="search-input"
            icon="search"
            placeholder="输入商品 ID 搜索"
            v-model="searchText"
            @keyup.enter="onSearch"
          />
        </div>
      </div>
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
            <div class="text-xl font-semibold">{{ tableTitle }}</div>
            <div class="ml-auto">
              <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="onDateChange"
              ></el-date-picker>
            </div>
          </div>
        </template>
        <template slot="thead">
          <vs-th>商品名称</vs-th>
          <vs-th>价格</vs-th>
          <vs-th>卖家昵称</vs-th>
          <vs-th>序号</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
            :data="tr"
          >
            <vs-td :data="data[i].name">
              {{ data[i].name }}
            </vs-td>

            <vs-td
              class="font-semibold"
              :data="data[i].price"
            >
              ￥{{ data[i].price }}
            </vs-td>

            <vs-td :data="data[i].nickname">
              {{ data[i].nickname }}
            </vs-td>

            <vs-td>
              {{ i + 1 }}
            </vs-td>

            <template slot="expand">
              <div class="flex w-full">
                <div class="w-1/6">
                  <div class="flex flex-col h-full justify-center items-center">
                    <vs-avatar
                      size="45px"
                      :src="tr.avatar_url"
                      @click="toUserDetail()"
                    />
                    <div
                      class="my-2 text-gray-600 hover:text-gray-800 text-base
                    font-semibold cursor-pointer"
                      @click="toUserDetail()"
                    >{{ tr.nickname }}</div>
                    <vs-chip color="success">
                      乐享信用 良好
                    </vs-chip>
                  </div>
                </div>
                <vs-list class="w-5/12">
                  <vs-list-header
                    class="text-base"
                    title="卖家信息"
                    color="success"
                  ></vs-list-header>
                  <vs-list-item
                    icon="person_outline"
                    title="真实姓名"
                    :subtitle="tr.real_name"
                  ></vs-list-item>
                  <vs-list-item
                    icon="star_border"
                    title="乐享值"
                    :subtitle="`${tr.price}`"
                  ></vs-list-item>
                </vs-list>
                <vs-list class="w-5/12">
                  <vs-list-header
                    class="text-base"
                    title="商品信息"
                    color="warning"
                  ></vs-list-header>
                  <vs-list-item
                    icon="turned_in_not"
                    title="商品 ID"
                    :subtitle="tr.goods_id"
                  >
                    <vs-button
                      color="#646464"
                      type="flat"
                      v-clipboard:copy="tr.goods_id"
                      v-clipboard:success="onCopy"
                    >复制</vs-button>
                  </vs-list-item>
                  <vs-list-item
                    icon="access_time"
                    title="发布时间"
                    :subtitle="tr.time"
                  >
                    <vs-button
                      type="flat"
                      @click="viewDetail(tr.goods_id)"
                    >查看订单详情</vs-button>
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
  name: 'GoodsList',
  data: () => ({
    tableTitle: '已上架商品', // 表格标题
    count: 0, // 已上架商品数量
    count2: 0, // 违规下架商品数量
    goods: [], // 商品列表
    searchText: '',
    date: null,
    pickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        },
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        },
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        },
      }],
    },
  }),

  mounted() {
    this.getGoods()
  },

  methods: {
    async getGoods() {
      if (this.tableLoading) return

      this.$vs.loading({
        type: 'point',
        container: '#table-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getGoods()
        if (code === 2000) {
          this.goods = data.goods
          this.count = data.count
          this.count2 = data.count2
        }
      } catch {
        //
      }

      this.$vs.loading.close('#table-loading > .con-vs-loading')
    },

    // 获取上架商品
    getAddedGoods() {
      this.getGoods()
    },

    // 获取下架商品
    getViolatingGoods() {
      this.getGoods()
    },

    onSearch() {
      if (this.searchText.length > 0) {
        this.getGoods()
      }
    },

    // 按日期获取商品
    onDateChange(date) {
      console.log(this.$dayjs(date[0]).unix(), this.$dayjs(date[1]).unix())
      this.getGoods()
    },

    // 查看商品详情
    viewDetail(id) {
      this.$router.push({ path: '/goods-detail', query: { id } })
    },

    // 查看用户详情
    toUserDetail() {
      this.$router.push({ path: '/user-detail', query: { } })
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
