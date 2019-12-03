<template>
  <div class="p-6 bg-white rounded-lg">
    <div class="text-xl font-bold text-gray-600">详细资料</div>
    <vs-divider />
    <div class="flex">
      <!-- 乐享信用 -->
      <div class="w-1/3">
        <div class="mb-8">
          <vs-chip :color="setCreditColor(info.credit_value)">
            乐享信用值：{{ info.credit_value }} / 1000
          </vs-chip>
          <vs-progress
            :height="8"
            :percent="(info.credit_value / 1000) * 100"
            :color="setCreditColor(info.credit_value)"
          ></vs-progress>
        </div>
        <div>
          <vs-chip color="primary">
            乐享值：{{ info.share_value }} / 1000
          </vs-chip>
          <vs-progress
            :height="8"
            :percent="(info.share_value / 1000) * 100"
          ></vs-progress>
        </div>
      </div>

      <!-- 用户资料 -->
      <div class="w-1/3 pl-10 text-sm">
        <InfoItem
          label="昵称"
          :value="info.nickname"
        />
        <InfoItem
          label="真实姓名"
          :value="info.real_name"
        />
        <InfoItem
          label="手机号码"
          :value="info.phone"
        />
        <InfoItem
          label="邮箱"
          :value="info.email || '未绑定'"
        />
        <InfoItem
          label="性别"
          :value="info.gender === '1' ? '男' : info.gender === '2' ? '女' : '未填写'"
        />
        <InfoItem
          label="QQ"
          :value="info.qq || '未填写'"
        />
        <InfoItem
          label="微信"
          :value="info.wechat || '未填写'"
        />
        <InfoItem
          label="学校"
          :value="info.school.name"
        />
        <vs-button
          class="w-24 mt-4"
          style="margin-left: 6.5rem;"
          type="border"
          size="small"
          @click="showSidebar = true"
        >编辑资料</vs-button>
      </div>

      <!-- 收货地址 -->
      <div class="w-1/3">
        <Address />
      </div>
    </div>

    <EditUserInfo
      :info="info"
      :isSidebarActive="showSidebar"
      @closeSidebar="showSidebar = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import InfoItem from './user-detail-info/InfoItem.vue'
import Address from './user-detail-info/Address.vue'

import { setCreditColor } from '@/utils/util'

const EditUserInfo = Vue.component(
  'EditUserInfo',
  () => import('./user-detail-info/EditUserInfo.vue'),
)

export default {
  name: 'UserDetailInfo',
  components: { InfoItem, Address, EditUserInfo },

  data: () => ({
    setCreditColor,
    showSidebar: false,
    detail: {},
  }),

  computed: {
    info() {
      return this.$store.state.user.info
    },
  },
}
</script>
