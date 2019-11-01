<template>
  <div class="p-6 bg-white rounded-lg">
    <div class="text-xl font-bold text-gray-600">详细资料</div>
    <vs-divider />
    <div class="flex">
      <!-- 乐享信用 -->
      <div class="w-1/3">
        <vs-chip :color="setCreditColor(detailInfo.credit_value)">
          乐享信用值：{{ detailInfo.credit_value }} / 1000
        </vs-chip>
        <vs-progress
          :height="8"
          :percent="(detailInfo.credit_value / 1000) * 100"
          :color="setCreditColor(detailInfo.credit_value)"
        ></vs-progress>
      </div>

      <!-- 用户资料 -->
      <div
        class="w-1/3"
        style="font-size: 14px;"
      >
        <InfoItem
          label="昵称"
          :value="detailInfo.nickname"
        />
        <InfoItem
          label="真实姓名"
          :value="detailInfo.real_name"
        />
        <InfoItem
          label="手机号码"
          :value="detailInfo.phone"
        />
        <InfoItem
          label="性别"
          :value="detailInfo.gender === '0' ? '女' : detailInfo.gender === '1' ? '男' : '未填写'"
        />
        <InfoItem
          label="QQ"
          :value="detailInfo.qq"
        />
        <InfoItem
          label="微信"
          :value="detailInfo.wechat"
        />
        <InfoItem
          label="学校"
          :value="detailInfo.school"
        />
        <vs-button
          v-auth
          class="w-24 mt-6"
          style="margin-left: 6.5rem;"
          type="border"
          size="small"
          @click="showSidebar = true"
        >编辑资料</vs-button>
      </div>

      <!-- 收货地址 -->
      <div class="w-1/3">
        <vs-list>
          <vs-list-header title="收货地址"></vs-list-header>
          <template v-if="addressList.length > 0">
            <vs-list-item
              v-for="(item, i) in addressList"
              :key="i"
              :title="`${item.receiver} ${item.phone}`"
              :subtitle="item.address"
            >
              <div class="flex items-center">
                <vs-chip
                  color="primary"
                  v-if="item.address_id === defaultAddress"
                >默认</vs-chip>
                <vs-dropdown vs-trigger-click>
                  <i class="el-icon-more ml-2 cursor-pointer"></i>
                  <vs-dropdown-menu class="w-24">
                    <vs-dropdown-item
                      v-if="!(item.address_id === defaultAddress)"
                      class="text-center"
                      @click="setDefaultAddress(item.address_id)"
                    >
                      设为默认
                    </vs-dropdown-item>
                    <vs-dropdown-item
                      class="text-center"
                      @click="onModifyAddress(item.address_id)"
                    >
                      修改
                    </vs-dropdown-item>
                    <vs-dropdown-item
                      class="text-center text-danger"
                      divider
                      @click="onDeleteAddress(item.address_id)"
                    >
                      删除
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </vs-list-item>
          </template>
          <div
            class="my-4 text-gray-600 text-center"
            v-else
          >暂无收货地址</div>
        </vs-list>
        <div
          class="mt-2 p-3 rounded-lg"
          style="background: rgba(150, 150, 150, 0.1);"
        >
          <div
            class="my-3"
            v-if="showAddressDiv"
          >
            <div class="flex">
              <vs-input
                class="mr-2"
                label="收货人"
                size="small"
                v-model="receiver"
                val-icon-warning="warning"
                :warning="receiverWarning"
                @focus="() => { receiverWarning = false }"
              />
              <vs-input
                label="联系电话"
                size="small"
                val-icon-warning="warning"
                v-model="phone"
                :warning="phoneWarning"
                @focus="() => { phoneWarning = false }"
              />
            </div>
            <vs-input
              class="w-full"
              label="地址"
              size="small"
              val-icon-warning="warning"
              v-model="address"
              :warning="addressWarning"
              @focus="() => { addressWarning = false }"
            />
          </div>
          <div class="flex items-center justify-end">
            <vs-button
              class="mr-2 text-xl"
              v-if="showAddressDiv"
              type="border"
              icon="done"
              @click="onshowAddressDiv()"
            ></vs-button>
            <vs-button
              class="text-xl"
              :color="showAddressDiv ? 'danger' : 'primary'"
              type="border"
              :icon="showAddressDiv ? 'clear' : 'add'"
              @click="onAddOrClose()"
            ></vs-button>
          </div>
        </div>
      </div>
    </div>

    <EditUserInfo
      :info="detailInfo"
      :isSidebarActive="showSidebar"
      @closeSidebar="showSidebar = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import InfoItem from './InfoItem.vue'

import { setCreditColor } from '@/utils/util'
import {
  getUserDetailInfo,
  getAddress,
  setDefaultAddress,
  addAddress,
  deleteAddress,
  modifyAddress,
} from '@/request/api/user'

const EditUserInfo = Vue.component(
  'EditUserInfo',
  () => import('./EditUserInfo.vue'),
)

export default {
  name: 'UserDetailInfo',
  data: () => ({
    setCreditColor,
    showSidebar: false,
    detailInfo: {},
    addressList: [], // 地址列表
    defaultAddress: null,
    showAddressDiv: false,
    receiver: '', // 收货人
    phone: '', // 联系电话
    address: '', // 地址
    receiverWarning: false,
    phoneWarning: false,
    addressWarning: false,
  }),

  components: { InfoItem, EditUserInfo },

  mounted() {
    this.getUserDetailInfo()
    this.getAddress()
  },

  methods: {
    async getUserDetailInfo() {
      try {
        const { code, data } = await getUserDetailInfo()
        if (code === 2000) {
          this.detailInfo = data.detail_info
        }
      } catch {
        // TODO
      }
    },

    async getAddress() {
      try {
        const { code, data } = await getAddress()
        if (code === 2000) {
          this.defaultAddress = data.default_address
          this.addressList = data.address_list
        }
      } catch {
        // TODO
      }
    },

    // 清空
    clearAddress() {
      this.receiver = ''
      this.phone = ''
      this.address = ''
      this.receiverWarning = false
      this.phoneWarning = false
      this.addressWarning = false
    },

    // 验证
    verification() {
      if (this.receiver.length <= 0) {
        this.receiverWarning = true
      }
      if (this.phone.length <= 0) {
        this.phoneWarning = true
      }
      if (this.address.length <= 0) {
        this.addressWarning = true
      }
      if (
        this.receiver.length > 0
        && this.phone.length > 0
        && this.address.length > 0
      ) {
        return true
      }
      return false
    },

    // 添加或关闭
    onAddOrClose() {
      if (this.showAddressDiv) {
        this.clearAddress()
        this.showAddressDiv = false
      } else {
        this.showAddressDiv = true
      }
    },

    // 添加地址
    async onshowAddressDiv() {
      if (this.verification()) {
        const { code, data } = await addAddress()
        if (code === 2000) {
          this.addressList.push({
            address_id: data.address_id,
            receiver: this.receiver,
            phone: this.phone,
            address: this.address,
          })
          this.clearAddress()
          this.showAddressDiv = false
        }
      }
      await modifyAddress()
    },

    // 删除地址
    async onDeleteAddress(id) {
      this.addressList.forEach((el, i, _this) => {
        if (el.address_id === id) {
          _this.splice(i, 1)
        }
      })
      await deleteAddress()
    },

    // 修改地址
    async onModifyAddress(id) {
      this.showAddressDiv = true

      this.addressList.forEach((el) => {
        if (el.address_id === id) {
          this.receiver = el.receiver
          this.phone = el.phone
          this.address = el.address
        }
      })
    },

    // 设置默认地址
    async setDefaultAddress(id) {
      this.defaultAddress = id
      await setDefaultAddress()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
