<template>
  <div class="flex">
    <div class="w-8/12">
      <!-- 我发布的 -->
      <div class="p-6 bg-white rounded-lg">
        <div class="text-lg font-bold mb-4">TA发布的</div>
        <div>
          <vs-table
            pagination
            max-items="3"
            noDataText="暂无数据"
            :data="publishedGoods"
          >
            <template slot="thead">
              <vs-th>图片</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>价格</vs-th>
              <vs-th>发布于</vs-th>
              <vs-th>状态</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
                :data="tr"
              >
                <vs-td :data="data[i].img_urls">
                  <vs-image
                    class="w-32 h-32 shadow"
                    :src="data[i].img_urls[0]"
                    @click.native="showViewer = true, imgUrls = tr.img_urls"
                  ></vs-image>
                </vs-td>

                <vs-td>{{ tr.name }}</vs-td>

                <vs-td class="font-semibold">￥{{ tr.price }}</vs-td>

                <vs-td>
                  <div class="whitespace-no-wrap">{{ timeDiff(data[i].time) }}</div>
                </vs-td>

                <vs-td>
                  <div
                    style="border-radius: 0.4rem;"
                    class="whitespace-no-wrap py-1 px-2"
                    :style="`background: rgba(var(--vs-${status[tr.status].color}), 0.2);`"
                    :class="[`text-${status[tr.status].color}`]"
                  >{{ status[tr.status].text }}</div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <!-- 我购买的 -->
      <div class="mt-6 p-6 bg-white rounded-lg">
        <div class="text-lg font-bold mb-4">TA购买的</div>
        <div>
          <vs-table
            pagination
            max-items="3"
            noDataText="暂无数据"
            :data="boughtGoods"
          >
            <template slot="thead">
              <vs-th>图片</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>成交价</vs-th>
              <vs-th>原主人</vs-th>
              <vs-th>状态</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
                :data="tr"
              >
                <vs-td>
                  <vs-image
                    class="w-32 h-32 shadow"
                    :src="tr.img_urls[0]"
                    @click.native="showViewer = true, imgUrls = tr.img_urls"
                  ></vs-image>
                </vs-td>
                <vs-td>{{ tr.name }}</vs-td>
                <vs-td class="font-semibold">￥{{ tr.price }}</vs-td>
                <vs-td>
                  <div class="whitespace-no-wrap">{{ timeDiff(tr.time) }}</div>
                </vs-td>

                <vs-td>
                  <div
                    style="border-radius: 0.4rem;"
                    class="whitespace-no-wrap py-1 px-2"
                    :style="`background: rgba(var(--vs-${status[tr.status].color}), 0.2);`"
                    :class="[`text-${status[tr.status].color}`]"
                  >{{ status[tr.status].text }}</div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </div>

    <div class="w-4/12 pl-5">
      <div class="p-5 bg-white rounded-lg">
        <div class="mb-4 text-gray-700">最近联系</div>
        <ul v-if="recentContacts.length > 0">
          <li
            class="mb-3 flex items-center justify-between"
            v-for="(item, i) in recentContacts"
            :key="i"
          >
            <div class="flex items-center">
              <vs-avatar
                class="mr-3"
                size="40px"
                :src="item.avatar_url"
              />
              <div>
                <div class="text-sm">{{ item.nickname }}</div>
                <div
                  class="text-gray-500"
                  style="font-size: 0.7rem;"
                >19/10/24 17:50</div>
              </div>
            </div>
            <vs-button
              radius
              color="primary"
              type="border"
              icon-pack="el-icon"
              icon="el-icon-user"
              @click="$router.push({
                        path: '/user-detail',
                        query: { id: item.user_id }
                      })"
            ></vs-button>
          </li>
          <li class="text-center">
            <vs-button class="text-sm w-2/3">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </vs-button>
          </li>
        </ul>
        <div
          class="text-gray-600 text-center text-sm"
          v-else
        >暂无最近联系人</div>
      </div>
    </div>

    <el-image-viewer
      v-show="showViewer"
      :on-close="() => showViewer = false"
      :url-list="imgUrls"
    />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'

import { timeDiff } from '@/utils/util'
import { getRecentContacts } from '@/request/api/user'
import { getPublished, getBought } from '@/request/api/goods'

export default {
  name: 'UserBaseInfo',
  data: () => ({
    timeDiff,
    userID: '',
    showViewer: false,
    imgUrls: [],
    publishedGoods: [],
    boughtGoods: [],
    recentContacts: [],
    status: {
      0: {
        color: 'warning',
        text: '待出售',
      },
      1: {
        color: 'primary',
        text: '已出售',
      },
    },
  }),

  components: { ElImageViewer },

  mounted() {
    this.userID = this.$route.query.id
    console.log('user id:', this.userID)
    this.getPublished()
    this.getBought()
    this.getRecentContacts()
  },

  methods: {
    async getPublished() {
      const { code, data } = await getPublished()
      if (code === 2000) {
        this.publishedGoods = data.goods
      }
    },

    async getBought() {
      const { code, data } = await getBought()
      if (code === 2000) {
        this.boughtGoods = data.goods
      }
    },

    async getRecentContacts() {
      try {
        const { code, data } = await getRecentContacts()
        if (code === 2000) {
          this.recentContacts = data.recent_contacts
        }
      } catch {
        // TODO
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vs-con-table {
  &::v-deep {
    .vs-table--thead {
      color: rgb(150, 150, 150);
    }
    .vs-table-text {
      justify-content: center;
    }
  }
}

.el-image-viewer__wrapper {
  &::v-deep .el-image-viewer__close {
    color: #ececec;
  }
}
</style>
