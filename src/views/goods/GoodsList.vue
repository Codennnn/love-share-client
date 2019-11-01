<template>
  <div>
    <div class="flex mt-3 mb-6">
      <div
        class="w-1/4 lg:px-6 px-3 flex items-center justify-between rounded-lg
      bg-white cursor-pointer hover:shadow-lg"
        style="transition: all 0.3s;"
        @click="getStoredGoods()"
      >
        <div>
          <div class="text-3xl">
            {{ storedCount ? storedCount.toLocaleString() : '--' }}
          </div>
          <div class="text-gray-600">已上架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-primary), 0.2)"
        >
          <i class="el-icon-sell p-2 text-3xl text-primary"></i>
        </div>
      </div>
      <div
        class="w-1/4 mx-5 lg:px-6 px-3 flex items-center justify-between rounded-lg
      bg-white cursor-pointer hover:shadow-lg"
        style="transition: all 0.3s;"
        @click="getDismountedGoods()"
      >
        <div>
          <div class="text-3xl">
            {{ dismountedCount ? dismountedCount.toLocaleString() : '--' }}
          </div>
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
        <div class="mb-3 text-gray-600">高级操作</div>
        <div class="flex items-center justify-end text-sm">
          <vs-button
            class="mr-5"
            color="primary"
            type="border"
            @click="exportExcel"
          >导出列表数据</vs-button>
          <vs-button
            type="relief"
            @click="$router.push({
                      path: '/goods-vivid-list'
                    })"
          >查看图片列表</vs-button>
        </div>
      </div>
    </div>

    <!-- 筛选搜索 -->
    <div class="mb-6 pt-3 pb-5 px-6 rounded-lg bg-white">
      <div class="mb-3 text-gray-600">筛选搜索</div>
      <div class="flex justify-around items-center flex-wrap">
        <div>
          <el-select
            v-model="value"
            filterable
            placeholder="根据商品分类搜索"
          >
            <el-option
              v-for="item in categoryList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            v-model="value"
            filterable
            placeholder="根据商品分类搜索"
          >
            <el-option
              v-for="item in schoolList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            v-model="value"
            filterable
            placeholder="根据学校搜索"
          >
            <el-option
              v-for="item in schoolList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <vs-button
            class="w-32 text-sm"
            type="relief"
          >确认搜索</vs-button>
        </div>
        <div class="mt">
          <vs-input
            class="search-input w-64"
            style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);"
            icon="search"
            placeholder="输入商品 ID 搜索"
            v-model="searchText"
            @keyup.enter="onSearchByID"
          />
        </div>
      </div>
    </div>

    <div
      id="table-loading"
      class="vs-con-loading__container"
    >
      <vs-table
        search
        pagination
        max-items="10"
        noDataText="暂无数据"
        :data="goodsList"
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
          <vs-th>单价</vs-th>
          <vs-th>件数</vs-th>
          <vs-th>卖家昵称</vs-th>
          <vs-th>#</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
            :data="tr"
          >
            <vs-td>{{ tr.name }}</vs-td>
            <vs-td class="font-bold">￥{{ tr.price }}</vs-td>
            <vs-td class="font-bold">{{ tr.goods_num }}</vs-td>
            <vs-td class="text-gray-700">{{ tr.nickname }}</vs-td>
            <vs-td class="text-gray-600">{{ i }}</vs-td>

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
import { getSchoolList } from '@/request/api/common'
import {
  getStoredGoods,
  getDismountedGoods,
  getGoodsCategory,
  getGoodsListInfo,
} from '@/request/api/goods'

export default {
  name: 'GoodsList',
  data: () => ({
    category: '',
    categoryList: [],
    schoolList: [],
    options: [{
      value: '选项1',
      label: '黄金糕',
    }, {
      value: '选项2',
      label: '双皮奶',
    }, {
      value: '选项3',
      label: '蚵仔煎',
    }, {
      value: '选项4',
      label: '龙须面',
    }, {
      value: '选项5',
      label: '北京烤鸭',
    }],
    value: '',
    tableTitle: '已上架商品', // 表格标题
    storedCount: null, // 已上架商品数量
    dismountedCount: null, // 违规下架商品数量
    goodsList: [], // 商品列表
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
    this.getStoredGoods()
    this.getGoodsListInfo()
    this.getGoodsCategory()
    this.getSchoolList()
  },

  methods: {
    // 获取上架商品
    async getStoredGoods() {
      if (this.tableLoading) return

      this.tableTitle = '已上架商品'
      this.$vs.loading({
        type: 'point',
        container: '#table-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getStoredGoods()
        if (code === 2000) {
          this.goodsList = data.goods
        }
      } catch {
        //
      }

      this.$vs.loading.close('#table-loading > .con-vs-loading')
    },

    // 获取下架商品
    async getDismountedGoods() {
      if (this.tableLoading) return

      this.tableTitle = '违规下架商品'
      this.$vs.loading({
        type: 'point',
        container: '#table-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getDismountedGoods()
        if (code === 2000) {
          this.goodsList = data.goods
        }
      } catch {
        //
      }

      this.$vs.loading.close('#table-loading > .con-vs-loading')
    },

    async getGoodsCategory() {
      try {
        const { code, data } = await getGoodsCategory()
        if (code === 2000) {
          this.categoryList = data.category_list
        }
      } catch {
        //
      }
    },

    async getGoodsListInfo() {
      try {
        const { code, data } = await getGoodsListInfo()
        if (code === 2000) {
          this.storedCount = data.stored_count
          this.dismountedCount = data.dismounted_count
        }
      } catch {
        //
      }
    },

    async getSchoolList() {
      try {
        const { code, data } = await getSchoolList()
        if (code === 2000) {
          this.schoolList = data.school_list
        }
      } catch {
        //
      }
    },

    onSearch() {
      if (this.searchText.length > 0) {
        this.getGoods()
      }
    },

    onSearchByID() {
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
    toUserDetail(id) {
      this.$router.push({ path: '/user-detail', query: { id } })
    },

    onCopy(e) {
      this.$message(`已复制订单编号：${e.text}  🎉`)
    },

    exportExcel() {
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['商品 ID', '商品名称', '价格', '卖家姓名', '发布时间']
        const filterVal = ['goods_id', 'name', 'price', 'real_name', 'time']
        const data = this.formatJson(filterVal, this.goodsList)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '乐享校园_商品列表',
          autoWidth: true,
          bookType: 'xlsx',
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map((j) => {
        if (j === 'timestamp') {
          return this.$dayjs.unix(v[j]).format('YYYY-MM-DD hh:mm:ss')
        }
        return v[j]
      }))
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

.el-select {
  &::v-deep .el-input__inner {
    border: 1px solid rgba(0, 0, 0, 0.2);
    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}

.vs-con-table {
  &::v-deep {
    .vs-table--search {
      margin-right: 20px;
      .vs-table--search-input {
        padding: 0.5rem 2.5rem;
        border: 1px solid rgba(0, 0, 0, 0.15);
        font-size: 1rem;
        & + i {
          left: 1rem;
        }
        &:focus + i {
          left: 1rem;
        }
      }
      .vs-icon {
        font-size: 1.4rem;
      }
    }
  }
}

.mt {
  @media (max-width: 1154px) {
    margin-top: 1rem;
  }
}
</style>
