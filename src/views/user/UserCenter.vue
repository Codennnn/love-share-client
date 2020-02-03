<template>
  <div>
    <div class="mb-6 bg-white rounded-lg p-5">
      <div class="mb-3 flex items-center">
        <div class="w-1/2 flex items-center">
          <el-dropdown
            class="avatar-drop"
            placement="bottom"
          >
            <vs-avatar
              class="avatar"
              size="100px"
              :src="info.avatar_url"
            />
            <el-dropdown-menu slot="dropdown">
              <div class="px-3 py-1">
                <el-upload
                  drag
                  class="avatar-upload"
                  action=""
                  accept="image/jpeg,image/jpg,image/png"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change='onSelect'
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">更换头像</div>
                  <div class="el-upload__tip"><em>点击上传图片（jpg、jpeg、png）</em></div>
                </el-upload>
              </div>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="ml-6 ">
            <div class="mb-4">
              <span class="font-bold text-2xl">{{ info.nickname }}</span>
              <span>（{{ info.real_name }}）</span>
            </div>
            <span
              v-if="info.school"
              class="my-2 py-1 px-3 text-center text-sm text-white"
              style="border-radius: 0.3rem; background: rgba(var(--vs-primary), 0.9)"
            >{{ info.school.name }}</span>
          </div>
        </div>
        <div class="w-1/2 flex justify-around">
          <div
            class="flex flex-col items-center justify-center cursor-pointer"
            @click="$router.push('/user-follows')"
          >
            <div>关注的人</div>
            <div class="mt-4 text-2xl font-bold">{{ num.follows_num || 0 }}</div>
          </div>
          <div
            class="flex flex-col items-center justify-center cursor-pointer"
            @click="$router.push('/user-fans')"
          >
            <div>粉丝数</div>
            <div class="mt-4 text-2xl font-bold">{{ num.fans_num || 0 }}</div>
          </div>
          <div
            class="flex flex-col items-center justify-center cursor-pointer"
            @click="$router.push('/user-collections')"
          >
            <div>收藏夹</div>
            <div class="mt-4 text-2xl font-bold">{{ num.collections_num || 0 }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-1/3">
          <p class="text-sm text-gray-600 break-words">
            {{ info.introduction || '未填写' }}
          </p>
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
            :type="setButtonType('UserResetPassword')"
            @click="currentComponent = 'UserResetPassword'"
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

    <ReplaceAvatar
      :popupActive="showAvatarPopup"
      :img="avatarImage"
      @closePopup="showAvatarPopup = false"
    />
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
const UserResetPassword = Vue.component(
  'UserResetPassword',
  () => import('./components/UserResetPassword.vue'),
)
const ReplaceAvatar = Vue.component(
  'ReplaceAvatar',
  () => import('./components/ReplaceAvatar.vue'),
)

export default {
  name: 'UserCenter',
  components: {
    UserBaseInfo,
    UserDetailInfo,
    UserProfit,
    UserResetPassword,
    ReplaceAvatar,
  },

  data: () => ({
    currentComponent: 'UserBaseInfo',
    num: {},

    showAvatarPopup: false,
    avatarImage: '',
  }),

  computed: {
    info() {
      return this.$store.state.user.info
    },
  },

  mounted() {
    this.currentComponent = this.$route.query.component || 'UserBaseInfo'
  },

  activated() {
    getUserInfoNum().then(({ code, data }) => {
      if (code === 2000) {
        this.num = data.info_num
      }
    })
  },

  methods: {
    setButtonType(current) {
      if (this.currentComponent === current) {
        return 'line'
      }
      return ''
    },

    onSelect(file) {
      const isLt4M = ((file.size / 1024 / 1024) < 2)
      if (!isLt4M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        this.showAvatarPopup = true
        this.avatarImage = e.target.result
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-drop::v-deep {
  position: relative;
  &:hover {
    .vs-avatar--con-img {
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }
      &::after {
        content: "更换头像";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        font-size: 1rem;
        color: white;
        text-align: center;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.avatar-upload::v-deep {
  width: 16rem;
  height: 8rem;
  .el-upload,
  .el-upload-dragger {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .el-icon-upload {
    margin: 0;
    margin-bottom: 0.6rem;
  }
}
</style>
