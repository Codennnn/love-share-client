<template>
  <div
    id="address-container"
    class="vs-con-loading__container"
  >
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
              v-if="item._id === defaultAddress"
            >默认</vs-chip>
            <vs-dropdown vs-trigger-click>
              <i class="el-icon-more ml-2 cursor-pointer"></i>
              <vs-dropdown-menu class="w-24">
                <vs-dropdown-item
                  v-if="!(item._id === defaultAddress)"
                  class="text-center"
                  @click="setDefaultAddress(item._id)"
                >
                  设为默认
                </vs-dropdown-item>
                <vs-dropdown-item
                  class="text-center"
                  @click="editForm = true, onShowForm(item)"
                >
                  修改
                </vs-dropdown-item>
                <vs-dropdown-item
                  class="text-center text-danger"
                  divider
                  @click="onDeleteAddress(item._id)"
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
        v-if="showForm"
      >
        <div class="flex pb-1">
          <vs-input
            class="mr-2"
            label-placeholder="收货人"
            v-model="addressData.receiver"
            val-icon-warning="warning"
            :warning="receiverWarning"
            @focus="() => { receiverWarning = false }"
          />
          <vs-input
            label-placeholder="联系电话"
            val-icon-warning="warning"
            v-model="addressData.phone"
            :warning="phoneWarning"
            @focus="() => { phoneWarning = false }"
          />
        </div>
        <vs-input
          class="w-full"
          label-placeholder="地址"
          val-icon-warning="warning"
          v-model="addressData.address"
          :warning="addressWarning"
          @focus="() => { addressWarning = false }"
        />
        <vs-select
          class="address-select mt-2"
          label="地址类型"
          placeholder="请选择地址"
          v-model="addressData.type"
          :warning="typeWarning"
          @focus="() => { typeWarning = false }"
        >
          <vs-select-item
            v-for="(item, i) in ['学校', '家庭', '公司']"
            :key="i"
            :value="item"
            :text="item"
          />
        </vs-select>
      </div>
      <div class="flex items-center justify-end">
        <vs-button
          class="mr-2 text-xl"
          v-if="showForm"
          type="border"
          icon="done"
          @click="editForm ? onUpdateAddress() : onAddAddress()"
        ></vs-button>
        <vs-button
          class="text-xl"
          :color="showForm ? 'danger' : 'primary'"
          type="border"
          :icon="showForm ? 'clear' : 'add'"
          @click="showForm ? onHideForm() : onShowForm()"
        ></vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import _cloneDeepWith from 'lodash/cloneDeepWith'

import {
  getAddressList,
  setDefaultAddress,
  addAddress,
  deleteAddress,
  updateAddress,
} from '@/request/api/user'

export default {
  name: 'Address',
  data: () => ({
    addressList: [], // 地址列表
    defaultAddress: null,
    showForm: false,
    editForm: false,

    addressData: {
      receiver: '', // 收货人
      phone: '', // 联系电话
      address: '', // 地址
      type: '', // 地址类型
    },

    receiverWarning: false,
    phoneWarning: false,
    addressWarning: false,
    typeWarning: false,
  }),

  created() {
    this.getAddressList()
  },

  methods: {
    // 获取收货地址
    async getAddressList() {
      const { code, data } = await getAddressList()
      if (code === 2000) {
        this.defaultAddress = data.default_address
        this.addressList = data.address_list
      }
    },

    // 验证
    verification() {
      if (this.addressData.receiver.length <= 0) {
        this.receiverWarning = true
      }
      if (this.addressData.phone.length <= 0) {
        this.phoneWarning = true
      }
      if (this.addressData.address.length <= 0) {
        this.addressWarning = true
      }
      if (this.addressData.type.length <= 0) {
        this.typeWarning = true
      }
      if (
        this.addressData.receiver.length > 0
        && this.addressData.phone.length > 0
        && this.addressData.address.length > 0
        && this.addressData.type.length > 0
      ) {
        return true
      }
      return false
    },

    // 显示地址表单
    onShowForm(data) {
      if (this.editForm) {
        this.addressData = _cloneDeepWith(data)
      }
      this.showForm = true
    },

    // 隐藏地址表单
    onHideForm() {
      this.showForm = false

      this.addressData = {
        receiver: '',
        phone: '',
        address: '',
        type: '',
      }

      this.receiverWarning = false
      this.phoneWarning = false
      this.addressWarning = false
      this.typeWarning = false
      this.editForm = false
    },

    // 添加地址
    async onAddAddress() {
      if (this.verification()) {
        this.$vs.loading({
          container: '#address-container',
        })

        try {
          const { code } = await addAddress(this.addressData)
          if (code === 2000) {
            await this.getAddressList()
            this.onHideForm()
          }
        } finally {
          this.$vs.loading.close('#address-container > .con-vs-loading')
        }
      }
    },

    // 删除地址
    async onDeleteAddress(address_id) {
      this.$vs.loading({
        container: '#address-container',
      })

      try {
        const { code } = await deleteAddress({ address_id })
        if (code === 2000) {
          await this.getAddressList()
          this.onHideForm()
        }
      } finally {
        this.$vs.loading.close('#address-container > .con-vs-loading')
      }
    },

    // 修改地址
    async onUpdateAddress() {
      if (this.verification()) {
        this.$vs.loading({
          container: '#address-container',
        })

        try {
          const { code } = await updateAddress(this.addressData)
          if (code === 2000) {
            await this.getAddressList()
            this.onHideForm()
          }
        } finally {
          this.$vs.loading.close('#address-container > .con-vs-loading')
        }
      }
    },

    // 设置默认地址
    async setDefaultAddress(address_id) {
      this.$vs.loading({
        container: '#address-container',
      })

      try {
        const { code } = await setDefaultAddress({ address_id })
        if (code === 2000) {
          this.defaultAddress = address_id
        }
      } finally {
        this.$vs.loading.close('#address-container > .con-vs-loading')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.address-select {
  &::v-deep {
    .vs-select--input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      font-size: 88%;
    }
    &.input-select-validate-warning .input-select {
      border-color: rgba(var(--vs-warning), 1);
    }
  }
}
</style>
