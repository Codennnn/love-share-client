<template>
  <div class="data-list mt-4">
    <vs-table
      search
      pagination
      noDataText="暂无数据"
      :max-items="itemsPerPage"
      :data="beggingList"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <vs-button
          v-login
          color="primary"
          type="border"
          size="small"
          @click="addNewDataSidebar = true"
        >
          <div class="px-1">
            <i class="el-icon-plus mr-1 font-semibold"></i>
            <span>添加求购信息</span>
          </div>
        </vs-button>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">求购标题</vs-th>
        <vs-th sort-key="category">分类信息</vs-th>
        <vs-th sort-key="price">求购价</vs-th>
        <vs-th sort-key="time">发布者</vs-th>
        <vs-th sort-key="time">发布时间</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
        >
          <vs-td>{{ tr.name }}</vs-td>
          <vs-td>
            <vs-chip
              class="mr-1"
              v-for="(it, i) in tr.category"
              :key="i"
            >
              {{ it.name }}
            </vs-chip>
          </vs-td>
          <vs-td>
            <div>
              <span class="text-gray-600 font-bold">￥{{ Number(tr.min_price).toFixed(2) }}</span>
              -
              <span class="text-gray-600 font-bold">￥{{ Number(tr.max_price).toFixed(2) }}</span>
            </div>
          </vs-td>
          <vs-td>
            <div class="flex items-center">
              <vs-avatar
                class="avatar w-8 h-8 mr-2"
                :src="`${tr.announcer.avatar_url}?imageView2/2/w/40`"
              />
              <p class="text-gray-600">{{ tr.announcer.nickname }}</p>
            </div>
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

    <!-- 侧边抽屉 -->
    <AddNewDataSidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="addNewDataSidebar = false"
    />
  </div>
</template>

<script>
import AddNewDataSidebar from './components/AddNewDataSidebar.vue'
import { timeDiff } from '@/utils/util'

import { getBeggingList } from '@/request/api/begging'

export default {
  name: 'BeggingList',
  components: { AddNewDataSidebar },

  data: () => ({
    timeDiff,
    beggingList: [],
    itemsPerPage: 10,
    addNewDataSidebar: false,
  }),

  created() {
    this.getBeggingList()
  },

  methods: {
    async getBeggingList() {
      const { code, data } = await getBeggingList({
        page: 1,
        page_size: 100,
      })
      if (code === 2000) {
        this.beggingList = data.begging_list
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.data-list {
  .vs-con-table::v-deep {
    background: transparent;
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
</style>
