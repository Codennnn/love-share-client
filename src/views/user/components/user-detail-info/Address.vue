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
          :title="`[${item.type}] ${item.receiver} - ${item.phone}`"
          :subtitle="item.address"
        >
          <div class="flex items-center">
            <vs-chip
              color="primary"
              v-if="item._id === defaultAddress"
            >默认</vs-chip>

            <el-dropdown size="small">
              <i class="el-icon-more ml-2 cursor-pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="!(item._id === defaultAddress)"
                  class="text-center"
                  @click.native="setDefaultAddress(item._id)"
                >设为默认</el-dropdown-item>
                <el-dropdown-item @click.native="editForm = true, onShowForm(item)">
                  修改
                </el-dropdown-item>
                <el-dropdown-item
                  @click.native="onDeleteAddress(item._id)"
                  divided
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </vs-list-item>
      </template>
      <div
        class="my-4 text-gray-600 text-center"
        v-else
      >暂无收货地址</div>
    </vs-list>
    <div class="mt-2 p-3 radius bg-gray-150">
      <CollapseTransition>
        <div v-if="showForm">
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
      </CollapseTransition>

      <!-- 操作按钮 -->
      <div class="mt-3 flex items-center justify-end">
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
import { mapState } from 'vuex'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

export default {
  name: 'Address',
  components: { CollapseTransition },

  data: () => ({
    showForm: false,
    editForm: false, // 是否为编辑模式

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

  computed: {
    ...mapState('user', ['defaultAddress', 'addressList']),
  },

  methods: {
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
        this.addressData = this.$cloneDeepWith(data)
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
        this.openLoading()
        try {
          await this.$store.dispatch('user/addAddress', this.addressData)
          this.onHideForm()
        } finally {
          this.closeLoading()
        }
      }
    },

    // 删除地址
    async onDeleteAddress(id) {
      this.openLoading()
      try {
        await this.$store.dispatch('user/deleteAddress', id)
        this.onHideForm()
      } finally {
        this.closeLoading()
      }
    },

    // 修改地址
    async onUpdateAddress() {
      if (this.verification()) {
        this.openLoading()
        try {
          await this.$store.dispatch('user/updateAddress', this.addressData)
          this.onHideForm()
        } finally {
          this.closeLoading()
        }
      }
    },

    // 设置默认地址
    async setDefaultAddress(id) {
      this.openLoading()
      try {
        await this.$store.dispatch('user/setDefaultAddress', id)
      } finally {
        this.closeLoading()
      }
    },

    openLoading() {
      this.$vs.loading({ container: '#address-container' })
    },

    closeLoading() {
      this.$vs.loading.close('#address-container > .con-vs-loading')
    },
  },
}
</script>

<style lang="scss" scoped>
.address-select::v-deep {
  .vs-select--input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 88%;
  }
  .input-select-validate-warning .input-select {
    border-color: rgba(var(--vs-warning), 1);
  }
}
</style>
