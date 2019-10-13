<template>
  <div>
    <div class="bg-white rounded-lg p-5">
      <div class="flex">
        <vs-avatar
          size="100px"
          :src="avatarUrl"
        />
        <div class="ml-6">
          <div>
            <span class="font-bold text-2xl">{{ userDetail.nickname }}</span>
            <span>（{{ userDetail.real_name }}）</span>
          </div>
          <div
            class="my-2 py-1 px-3 text-center text-sm text-white bg-primary"
            style="border-radius: 0.3rem;"
          >{{ userDetail.school }}</div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-1/3">
          <vs-progress
            :height="8"
            :percent="60"
            color="warning"
          >danger</vs-progress>
        </div>
        <div class="flex justify-end w-2/3">
          <vs-button
            class="mr-4"
            color="#646464"
            type="flat"
          >基本信息</vs-button>
          <vs-button
            class="mr-4"
            color="#646464"
            type="flat"
          >我的消息</vs-button>
          <vs-button
            color="#646464"
            type="flat"
          >修改密码</vs-button>
        </div>
      </div>
    </div>
    <div>
      <vs-row>
        <vs-col vs-w="8">
          <div class="mt-6 p-6 bg-white rounded-lg">
            <div class="text-lg font-bold mb-4">我发布的</div>
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
                      ></vs-image>
                    </vs-td>

                    <vs-td :data="data[i].name">
                      {{data[i].name}}
                    </vs-td>

                    <vs-td
                      class="font-semibold"
                      :data="data[i].price"
                    >
                      ￥{{data[i].price}}
                    </vs-td>

                    <vs-td :data="data[i].time">
                      <div class="whitespace-no-wrap">{{ timeDiff(data[i].time) }}</div>
                    </vs-td>

                    <vs-td :data="data[i].status">
                      <div
                        style="border-radius: 0.4rem;"
                        class="whitespace-no-wrap py-1 px-2"
                        :style="`background: rgba(var(--vs-${status[data[i].status].color}), 0.2);`"
                        :class="[`text-${status[data[i].status].color}`]"
                      >{{ status[data[i].status].text }}</div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </div>

          <div class="mt-6 p-6 bg-white rounded-lg">
            <div class="text-lg font-bold mb-4">我购买的</div>
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
                    <vs-td :data="data[i].img_urls">
                      <vs-image
                        class="w-32 h-32 shadow"
                        :src="data[i].img_urls[0]"
                      ></vs-image>
                    </vs-td>

                    <vs-td :data="data[i].name">
                      {{data[i].name}}
                    </vs-td>

                    <vs-td
                      class="font-semibold"
                      :data="data[i].price"
                    >
                      ￥{{data[i].price}}
                    </vs-td>

                    <vs-td :data="data[i].time">
                      <div class="whitespace-no-wrap">{{ timeDiff(data[i].time) }}</div>
                    </vs-td>

                    <vs-td :data="data[i].status">
                      <div
                        style="border-radius: 0.4rem;"
                        class="whitespace-no-wrap py-1 px-2"
                        :style="`background: rgba(var(--vs-${status[data[i].status].color}), 0.2);`"
                        :class="[`text-${status[data[i].status].color}`]"
                      >{{ status[data[i].status].text }}</div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { timeDiff } from '@/utils/util'
import { getPublished, getBought } from '@/request/api/goods'

export default {
  name: 'UserDetail',
  data: () => ({
    timeDiff,
    avatarUrl: 'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4',
    publishedGoods: [],
    boughtGoods: [],
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

  mounted() {
    this.getPublished()
    this.getBought()
  },

  computed: {
    userDetail() {
      return this.$store.state.user.detail
    },
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
</style>