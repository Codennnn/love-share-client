<template>
  <div class="flex">
    <div class="w-8/12 pr-3">
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

    <div class="w-4/12 pl-2">
      <div class="p-6 bg-white rounded-lg"></div>
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
import { getPublished, getBought } from '@/request/api/goods'

export default {
  name: 'UserBaseInfo',
  data: () => ({
    timeDiff,
    showViewer: false,
    imgUrls: [],
    publishedGoods: [],
    userDetail: {},
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

  components: { ElImageViewer },

  mounted() {
    this.getPublished()
    this.getBought()
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

.el-image-viewer__wrapper {
  &::v-deep .el-image-viewer__close {
    color: #ececec;
  }
}
</style>
