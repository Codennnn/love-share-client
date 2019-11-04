<template>
  <div class="data-list mt-4">
    <vs-table
      search
      multiple
      pagination
      noDataText="暂无数据"
      :max-items="itemsPerPage"
      :data="buyingList"
      v-model="selected"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <vs-button
          v-auth
          style="padding: 7px 10px;"
          color="primary"
          type="border"
          size="small"
          @click="addNewDataSidebar = true, sidebarTitle = '添加求购信息'"
        >
          <i class="el-icon-plus mr-1 font-semibold"></i>
          <span>添加求购信息</span>
        </vs-button>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">商品标题</vs-th>
        <vs-th sort-key="category">分类</vs-th>
        <vs-th sort-key="price">求购价</vs-th>
        <vs-th sort-key="time">发布时间</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
          :data="tr"
        >
          <vs-td>{{ tr.name }}</vs-td>
          <vs-td>
            <vs-chip
              class="mr-1"
              v-for="(item, i) in tr.category"
              :key="i"
            >
              {{ item }}
            </vs-chip>
          </vs-td>
          <vs-td>
            <p class="text-gray-600 font-bold">￥{{ Number(tr.price).toFixed(2) }}</p>
          </vs-td>
          <vs-td>
            <p class="text-gray-600">{{ tr.time }}</p>
          </vs-td>
          <vs-td v-if="$auth()">
            <div class="text-center">
              <vs-dropdown>
                <i class="el-icon-more-outline"></i>
                <vs-dropdown-menu class="w-24">
                  <vs-dropdown-item
                    v-auth
                    class="text-center"
                    @click="addNewDataSidebar = true, sidebarTitle = '编辑更新信息', sidebarData = tr"
                  >
                    <i class="el-icon-edit mr-2"></i>
                    <span>编辑</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item
                    v-auth
                    divider
                    class="text-center text-danger"
                    @click="deleteData(tr.buying_id)"
                  >
                    <i class="el-icon-delete mr-2"></i>
                    <span>删除</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <!-- 侧边抽屉 -->
    <AddNewDataSidebar
      :title="sidebarTitle"
      :isSidebarActive="addNewDataSidebar"
      :data="sidebarData"
      @addListData="addData"
      @updateListData="updateData"
      @closeSidebar="addNewDataSidebar = false"
    />
  </div>
</template>

<script>
import AddNewDataSidebar from './components/AddNewDataSidebar.vue'

import {
  getBuyingList,
  addBuying,
  deleteBuying,
  updateBuying,
} from '@/request/api/buying'

export default {
  data: () => ({
    selected: [],
    itemsPerPage: 6,
    buyingList: [],
    sidebarTitle: '',
    sidebarData: {},
    addNewDataSidebar: false,
  }),

  components: { AddNewDataSidebar },

  mounted() {
    this.getBuyingList()
  },

  methods: {
    async getBuyingList() {
      const { code, data } = await getBuyingList()
      if (code === 2000) {
        this.buyingList = data.buying_list
      }
    },

    notify({
      title, text, color = 'success', time = 3000,
    }) {
      this.$vs.notify({
        title, text, color, time,
      })
    },

    async addData(info) {
      const { code, data } = await addBuying()
      if (code === 2000) {
        info.buying_id = data.buying_id
        this.buyingList.unshift(info)
        this.notify({ title: '添加成功', text: '成功添加一条求购商品信息' })
      }
    },

    async deleteData(id) {
      this.buyingList.forEach((el, i, _this) => {
        if (el.buying_id === id) {
          _this.splice(i, 1)
        }
      })
      const { code } = await deleteBuying()
      if (code === 2000) {
        this.notify({ title: '删除成功', text: '成功删除一条求购商品信息' })
      }
    },

    async updateData(data) {
      this.buyingList.forEach((el, i, _this) => {
        if (el.buying_id === data.buying_id) {
          _this.splice(i, 1, data)
        }
      })
      const { code } = await updateBuying()
      if (code === 2000) {
        this.notify({ title: '更新成功', text: '成功更新一条求购商品信息' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.data-list {
  .vs-con-table {
    background: transparent;
    &::v-deep {
      .vs-table--header {
        height: 45px;
        display: flex;
        flex-wrap: wrap-reverse;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search {
          .vs-table--search-input {
            padding: 0.5rem 2.5rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
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

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;
        & .is-selected {
          border: none;
          border-radius: 5px;
          box-shadow: 0 0 10px 0 rgba(var(--vs-primary), 0.2) !important;
          overflow: hidden;
        }
        tr {
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
          td {
            padding: 20px;
            &:first-child {
              border-top-left-radius: 0.5rem;
              border-bottom-left-radius: 0.5rem;
            }
            &:last-child {
              border-top-right-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            }
          }
          td.td-check {
            padding: 20px !important;
          }
        }
      }

      .vs-table--thead {
        th {
          padding-top: 0;
          padding-bottom: 0;
          .vs-table-text {
            text-transform: uppercase;
            font-weight: 600;
            color: #6e6e6e;
          }
        }
        th.td-check {
          padding: 0 15px !important;
          .con-td-check {
            background: transparent;
            box-shadow: none;
          }
        }
        tr {
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }
  }
}
</style>
