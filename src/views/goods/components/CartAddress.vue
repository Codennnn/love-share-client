<template>
  <div class="flex">
    <div
      class="pr-3"
      :class="addressList.length > 0 ? 'w-2/3' : 'w-full'"
    >
      <div class="p-5 bg-white shadow rounded-lg">
        <p class="text-lg font-bold">设置新的收货地址</p>
        <p class="text-sm text-gray-500">填写完成时，请确认地址无误</p>
        <div class="w-2/3 my-8">
          <el-form
            ref="form"
            label-width="100px"
            hide-required-asterisk
            :rules="rules"
            :model="newAddress"
          >
            <el-form-item
              label="收货人姓名"
              prop="receiver"
            >
              <el-input v-model="newAddress.receiver"></el-input>
            </el-form-item>
            <el-form-item
              label="收货地址"
              prop="address"
            >
              <el-input v-model="newAddress.address"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="phone"
            >
              <el-input v-model="newAddress.phone"></el-input>
            </el-form-item>
            <el-form-item
              label="地址类型"
              prop="address_type"
            >
              <el-select
                v-model="newAddress.address_type"
                placeholder="请选择地址类型"
              >
                <el-option
                  v-for="(item, i) in ['学校', '家庭', '公司']"
                  :key="i"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="btn-group">
              <vs-button
                class="mr-4"
                type="border"
                @click="onResetForm()"
              >重新填写</vs-button>
              <vs-button @click="onSetAddress()">设置地址并保存</vs-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div
      class="w-1/3 pl-3"
      v-if="addressList.length > 0"
    >
      <div class="p-5 bg-white shadow rounded-lg">
        <div class="flex justify-between items-center text-2xl">
          {{ current.receiver }}
          <span
            class="text-sm text-primary cursor-pointer"
            @click="activePopup()"
          >选择其它地址</span>
        </div>
        <div class="my-3 flex flex-wrap items-center">
          <vs-chip>{{ current.address_type }}</vs-chip>
          <span
            class="ml-2"
            style="color: #666;"
          >{{ current.address }}</span>
        </div>
        <div style="color: #888;">{{ current.phone }}</div>
        <vs-divider />
        <vs-button
          class="w-full mt-4"
          @click="onSettle()"
        >使用这个地址</vs-button>
      </div>
    </div>

    <vs-popup
      title="选择收货地址"
      :active.sync="showPopup"
    >
      <ul>
        <li
          class="mb-3 px-12 flex justify-between items-center"
          v-for="(item, i) in addressList"
          :key="i"
        >
          <vs-chip>{{ item.address_type }}</vs-chip>
          <div>
            <span class="mx-3 text-lg">{{ item.receiver }}</span>
            <span>{{ item.phone }}</span>
            <p class="text-gray-600">{{ item.address }}</p>
          </div>
          <vs-radio
            v-model="addressCheck"
            vs-name="radios1"
            :vs-value="item"
          ></vs-radio>
        </li>
      </ul>

      <div class="mt-8 text-center">
        <vs-button @click="onSelectAddress()">选择这个地址</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import {
  getAddressList, addAddress,
} from '@/request/api/user'

export default {
  name: 'CartAddress',
  data: () => ({
    addressList: [],
    defaultAddress: '',
    current: {},
    showPopup: false,
    addressCheck: null,

    rules: {
      receiver: [
        { required: true, message: '请填写收货人姓名' },
      ],
      address: [
        { required: true, message: '请填写收货地址' },
      ],
      phone: [
        { required: true, message: '请填写联系电话' },
      ],
      address_type: [
        { required: true, message: '请填写地址类型' },
      ],
    },
    newAddress: {
      receiver: '',
      address: '',
      phone: '',
      address_type: '',
    },
  }),

  mounted() {
    this.getAddressList()
  },

  methods: {
    // 获取收货地址
    async getAddressList() {
      try {
        const { code, data } = await getAddressList()
        if (code === 2000) {
          this.defaultAddress = data.default_address
          this.addressList = data.address_list
          this.addressList.forEach((el) => {
            if (el.address_id) {
              this.current = el
            }
          })
        }
      } catch {
        // TODO
      }
    },

    activePopup() {
      this.showPopup = true
      this.addressCheck = this.current
    },

    onSelectAddress() {
      this.current = this.addressCheck
      this.showPopup = false
    },

    onSetAddress() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.onSettle()
          await addAddress()
          return true
        }
        return false
      })
    },

    onResetForm() {
      this.$refs.form.resetFields()
    },

    onSettle() {
      this.$emit('switchComponent', {
        currentStep: 3,
        currentComponent: 'CartSettle',
        isActive: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}

.con-vs-popup {
  &::v-deep {
    .vs-popup {
      width: 450px;
    }
  }
}

.btn-group {
  &::v-deep {
    .el-form-item__content {
      line-height: inherit;
    }
  }
}
</style>
