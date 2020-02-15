<template>
  <div>
    <div class="mb-6 bg-white rounded-lg p-5">
      <div class="mb-3 flex items-center">
        <div class="w-1/2 flex items-center">
          <vs-avatar
            class="mr-6 avatar"
            size="100px"
            :src="info.avatar_url"
          />
          <div>
            <div class="mb-4">
              <span class="font-bold text-2xl">{{ info.nickname }}</span>
              <span class="text-gray-600">（{{ info.real_name }}）</span>
              <i
                class="el-icon-male ml-1 text-primary text-xl"
                v-if="info.gender === '1'"
              ></i>
              <i
                class="el-icon-female ml-1 text-danger text-xl"
                v-else-if="info.gender === '2'"
              ></i>
            </div>
            <div class="flex items-center">
              <vs-chip
                v-if="info.school"
                class="mr-2"
              >
                <feather
                  class="mr-1"
                  size="18"
                  type="map-pin"
                ></feather>
                {{ info.school.name }}
              </vs-chip>
              <vs-button
                v-if="isFollowed"
                class="w-24 text-gray-600"
                size="small"
                color="#f7fafc"
                icon-pack="el-icon"
                icon="el-icon-check"
                :disabled="disabled"
                @click="unsubscribe(info._id)"
              >已关注</vs-button>
              <vs-button
                v-else
                class="w-24"
                size="small"
                icon-pack="el-icon"
                icon="el-icon-plus"
                :disabled="disabled"
                @click="subscribe(info._id)"
              >关 注</vs-button>
            </div>
          </div>
        </div>
        <div class="w-1/2 flex justify-around">
          <div class="flex flex-col items-center justify-center cursor-pointer">
            <div>关注的人</div>
            <div class="mt-4 text-2xl font-bold">{{ num.follows_num || 0 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center cursor-pointer">
            <div>粉丝数</div>
            <div class="mt-4 text-2xl font-bold">{{ num.fans_num || 0 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center cursor-pointer">
            <div>收藏夹</div>
            <div class="mt-4 text-2xl font-bold">{{ num.collections_num || 0 }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-1/3">
          <p class="text-sm text-gray-600 break-words">
            <span class="cursor-default">个人简介：</span>
            {{ info.introduction || '未填写' }}
          </p>
        </div>
        <div class="ml-auto mr-12">
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
          >
            <div
              class="w-24 h-8 text-primary flex-row-center text-sm cursor-pointer"
              style="background: rgba(var(--vs-primary), 0.15); border-radius: 0.9rem;"
            >详细资料</div>
            <vs-dropdown-menu style="width: 250px;">
              <div class="p-3">
                <div class="info-item">
                  <vs-chip>微 信</vs-chip>
                  <span class="val">{{ info.wechat || '未填写' }}</span>
                </div>
                <div class="info-item">
                  <vs-chip>Q 号</vs-chip>
                  <span class="val">{{ info.qq || '未填写' }}</span>
                </div>
                <div class="info-item">
                  <vs-chip>邮 箱</vs-chip>
                  <span class="val">{{ info.email || '未填写' }}</span>
                </div>
                <div class="info-item">
                  <vs-chip>手机号码</vs-chip>
                  <span class="val">{{ info.phone || '未填写' }}</span>
                </div>
              </div>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>
    </div>

    <div class="p-4 bg-white rounded-lg">
      <div class="text-lg font-bold mb-4">TA 发布的</div>
      <vs-table
        pagination
        noDataText="暂无数据"
        :max-items="3"
        :data="publishedGoods"
      >
        <template slot="thead">
          <vs-th>图片</vs-th>
          <vs-th>商品名称</vs-th>
          <vs-th>价格</vs-th>
          <vs-th>发布于</vs-th>
          <vs-th>最后更新</vs-th>
          <vs-th>状态</vs-th>
          <vs-th>操作</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
          >
            <vs-td>
              <el-image
                class="w-24 h-24 base-shadow radius"
                fit="contain"
                :src="`${tr.img_list[0]}?imageView2/2/w/100`"
              ></el-image>
            </vs-td>
            <vs-td>
              <p>{{ tr.name }}</p>
            </vs-td>
            <vs-td class="font-semibold">￥{{ $numFixed(tr.price) }}</vs-td>
            <vs-td>
              <div class="whitespace-no-wrap">{{ $timeDiff(tr.created_at) }}</div>
            </vs-td>
            <vs-td>
              <div class="whitespace-no-wrap">{{ $timeDiff(tr.updated_at) }}</div>
            </vs-td>
            <vs-td>
              <div
                class="w-16 py-1 px-2 text-center whitespace-no-wrap"
                style="border-radius: 0.4rem;"
                :class="`text-${status[tr.status].color}`"
                :style="`background: rgba(var(--vs-${status[tr.status].color}), 0.2);`"
              >{{ status[tr.status].text }}</div>
            </vs-td>
            <vs-td>
              <feather
                title="查看商品主页"
                size="20"
                type="log-in"
                class="text-gray-600 cursor-pointer"
                @click="viewGoodsDetail(tr._id)"
              ></feather>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import {
  getUserInfoNum, getOtherUserInfo, subscribe, unsubscribe, isUserFollowed, getPublishedGoods,
} from '@/request/api/user'

const status = {
  undefined: { color: 'dark', text: '未定义' },
  1: { color: 'warning', text: '待出售' },
  2: { color: 'primary', text: '进行中' },
  3: { color: 'danger', text: '已下架' },
  4: { color: 'success', text: '已出兽' },
  5: { color: 'primary', text: '派送中' },
}
export default {
  name: 'UserDetail',
  data: () => ({
    status,
    userId: '',
    info: {},
    num: {},
    publishedGoods: [],
    isFollowed: false,
    disabled: false,
  }),

  created() {
    const user_id = this.$route.query.userId
    if (user_id !== this.$store.state.user.info._id) {
      this.isUserFollowed(user_id)
      getUserInfoNum({ user_id }).then(({ code, data }) => {
        if (code === 2000) {
          this.num = data.info_num
        }
      })
      getOtherUserInfo({ user_id }).then(({ code, data }) => {
        if (code === 2000) {
          this.info = data.user_info
        }
      })
      getPublishedGoods({ user_id }).then(({ code, data }) => {
        if (code === 2000) {
          this.publishedGoods = data.published_goods
        }
      })
    } else {
      this.$router.replace('/user-center')
    }
  },

  methods: {
    // 关注
    async subscribe(user_id) {
      this.disabled = true
      try {
        const { code } = await subscribe({ user_id })
        if (code === 2000) {
          this.isFollowed = true
        }
      } finally {
        this.disabled = false
      }
    },

    // 取消关注
    async unsubscribe(user_id) {
      this.disabled = true
      try {
        const { code } = await unsubscribe({ user_id })
        if (code === 2000) {
          this.isFollowed = false
        }
      } finally {
        this.disabled = false
      }
    },

    async isUserFollowed(user_id) {
      const { code, data } = await isUserFollowed({ user_id })
      if (code === 2000) {
        this.isFollowed = data.is_followed
      }
    },

    viewGoodsDetail(goodsId) {
      this.$router.push({
        path: '/goods-detail',
        query: { goodsId },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.info-item {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  .con-vs-chip {
    margin-right: 0.5rem;
  }
  .val {
    font-size: 0.8rem;
  }
}
</style>
