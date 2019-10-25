<template>
  <div class="data-list mt-4">
    <vs-table
      search
      multiple
      pagination
      noDataText="暂无数据"
      :max-items="itemsPerPage"
      :data="userList"
      v-model="selected"
    >
      <template slot="thead">
        <vs-th>头像</vs-th>
        <vs-th>昵称</vs-th>
        <vs-th>乐享信用值</vs-th>
        <vs-th sort-key="share_value">乐享值</vs-th>
        <vs-th sort-key="time">注册时间</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
          :data="tr"
        >
          <vs-td>
            <vs-avatar
              size="80px"
              :src="tr.avatar_url"
            />
          </vs-td>
          <vs-td>{{ tr.nickname }}</vs-td>
          <vs-td>
            <vs-progress
              :title="tr.credit_value"
              :percent="(tr.credit_value / 1000) * 100"
              :color="getCreditColor(tr.credit_value)"
            ></vs-progress>
          </vs-td>
          <vs-td>
            <p class="text-gray-600">{{ tr.share_value }}</p>
          </vs-td>
          <vs-td>
            <p class="text-gray-600">{{ tr.time }}</p>
          </vs-td>
          <vs-td>
            <div class="text-center">
              <vs-dropdown>
                <i class="el-icon-more-outline"></i>
                <vs-dropdown-menu class="w-24">
                  <vs-dropdown-item
                    class="text-center"
                    @click="$router.push({ path: '/user-detail' })"
                  >
                    <i class="el-icon-chat-round mr-2"></i>
                    <span>联系</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item
                    class="text-center"
                    @click="$router.push({
                              path: '/user-detail',
                              query: { id: tr.user_id }
                            })"
                  >
                    <i class="el-icon-news mr-2"></i>
                    <span>查看</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item class="text-center text-danger">
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
  </div>
</template>

<script>
import { getUserList } from '@/request/api/user'

export default {
  name: 'userList',
  data: () => ({
    selected: [],
    itemsPerPage: 4,
    userList: [],
  }),

  mounted() {
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const { code, data } = await getUserList()
      if (code === 2000) {
        this.userList = data.user_list
      }
    },

    getCreditColor(val) {
      if (val >= 500 && val <= 690) {
        return 'primary'
      }
      if (val > 690) {
        return 'success'
      }
      if (val < 490 && val >= 390) {
        return 'warning'
      }
      if (val < 390) {
        return 'danger'
      }
      return 'primary'
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
