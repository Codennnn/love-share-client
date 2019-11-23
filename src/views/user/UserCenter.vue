<template>
  <div>
    <div class="mb-6 bg-white rounded-lg p-5">
      <div class="mb-3 flex items-center">
        <div class="w-1/2 flex items-center">
          <vs-avatar
            class="mr-6"
            size="100px"
            :src="info.avatar_url"
          />
          <div>
            <div class="mb-4">
              <span class="font-bold text-2xl">{{ info.nickname }}</span>
              <span>（{{ info.real_name }}）</span>
            </div>
            <span
              class="my-2 py-1 px-3 text-center text-sm text-white"
              style="border-radius: 0.3rem;background: rgba(var(--vs-primary), 0.9)"
            >{{ info.school }}</span>
          </div>
        </div>
        <div class="w-1/2 flex justify-around">
          <div class="flex flex-col items-center justify-center">
            <div>关注的人</div>
            <div class="mt-4 text-2xl font-bold">{{ infoNum.follow_num }}</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div>粉丝数</div>
            <div class="mt-4 text-2xl font-bold">{{ infoNum.fans_num }}</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div>收藏夹</div>
            <div class="mt-4 text-2xl font-bold">{{ infoNum.collect_num }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-1/3">
          <vs-collapse>
            <vs-collapse-item :not-arrow="true">
              <vs-button
                slot="header"
                class="text-sm"
                color="dark"
                type="line"
              >个人简介</vs-button>
              <div class="text-gray-600">
                {{ info.introduction || '未填写' }}
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </div>
        <div class="flex justify-end w-2/3">
          <vs-button
            class="mr-4 text-gray-700"
            color="#646464"
            :type="setButtonType('UserBaseInfo')"
            @click="currentComponent = 'UserBaseInfo'"
          >概 况</vs-button>
          <vs-button
            class="mr-4 text-gray-700"
            color="#646464"
            :type="setButtonType('UserDetailInfo')"
            @click="currentComponent = 'UserDetailInfo'"
          >详细资料</vs-button>
          <vs-button
            class="mr-4 text-gray-700"
            color="#646464"
            :type="setButtonType('UserProfit')"
            @click="currentComponent = 'UserProfit'"
          >财富收益</vs-button>
          <vs-button
            class="text-gray-700"
            color="#646464"
            :type="setButtonType('UserChangePassword')"
            @click="currentComponent = 'UserChangePassword'"
          >修改密码</vs-button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="animated fadeIn quickly"
      leave-active-class="animated fadeOut quickly"
      mode="out-in"
    >
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import UserBaseInfo from './components/UserBaseInfo.vue'

import { getUserInfoNum } from '@/request/api/user'

const UserDetailInfo = Vue.component(
  'UserDetailInfo',
  () => import('./components/UserDetailInfo.vue'),
)
const UserProfit = Vue.component(
  'UserProfit',
  () => import('./components/UserProfit.vue'),
)
const UserChangePassword = Vue.component(
  'UserChangePassword',
  () => import('./components/UserChangePassword.vue'),
)

export default {
  name: 'UserCenter',
  components: {
    UserBaseInfo,
    UserDetailInfo,
    UserProfit,
    UserChangePassword,
  },

  data: () => ({
    currentComponent: 'UserBaseInfo',
    infoNum: {},
  }),

  computed: {
    info() {
      return this.$store.state.user.info
    },
  },

  created() {
    getUserInfoNum().then(({ code, data }) => {
      if (code === 2000) {
        this.infoNum = data.info_num
      }
    })
  },

  mounted() {
    this.currentComponent = this.$route.query.component || 'UserBaseInfo'
  },

  methods: {
    setButtonType(current) {
      if (this.currentComponent === current) {
        return 'line'
      }
      return ''
    },
  },
}
</script>

<style lang="scss" scoped>
.quickly {
  animation-duration: 0.2s;
}
</style>
