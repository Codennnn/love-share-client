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
            <span
              v-if="info.school"
              class="my-2 py-1 px-3 text-center text-sm text-white"
              style="border-radius: 0.3rem; background: rgba(var(--vs-primary), 0.9)"
            >{{ info.school.name }}</span>
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
            个人简介：
            {{ info.introduction || '未填写' }}
          </p>
        </div>
        <div class="ml-auto mr-12">
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
            color="rgb(91, 143, 255)"
            gradient-color-secondary="rgb(139, 176, 255)"
            type="gradient"
            icon-pack="el-icon"
            icon="el-icon-plus"
            :disabled="disabled"
            @click="subscribe(info._id)"
          >关 注</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserInfoNum, getOtherUserInfo, subscribe, unsubscribe, isUserFollowed,
} from '@/request/api/user'

export default {
  name: 'UserDetail',
  data: () => ({
    userId: '',
    info: {},
    num: {},
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
  },
}
</script>

<style lang="scss" scoped>
</style>
