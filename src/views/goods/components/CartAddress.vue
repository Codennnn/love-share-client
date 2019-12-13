<template>
  <div class="flex">
    <div
      class="pr-4"
      :class="addressList.length > 0 ? 'w-2/3' : 'w-full'"
    >
      <div class="p-5 bg-white base-shadow rounded-lg">
        <p class="text-lg font-bold">设置新的收货地址</p>
        <p class="text-sm text-gray-500">填写完成时，请确认信息无误</p>
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
              <el-input
                placeholder="收货人姓名"
                v-model="newAddress.receiver"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="收货地址"
              prop="address"
            >
              <el-input
                placeholder="省份 - 地区 - 具体位置"
                v-model="newAddress.address"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="phone"
            >
              <el-input
                placeholder="收货人的联系方式"
                v-model="newAddress.phone"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地址类型"
              prop="type"
            >
              <el-select
                v-model="newAddress.type"
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
                class="w-24 mr-4"
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
      <div class="p-5 bg-white base-shadow rounded-lg">
        <div class="flex justify-between items-center text-2xl">
          {{ current.receiver }}
          <span
            class="text-sm text-primary cursor-pointer"
            @click="activePopup()"
          >选择其它地址</span>
        </div>
        <div class="my-3 flex flex-wrap items-center">
          <vs-chip>{{ current.type }}</vs-chip>
          <span
            class="ml-2"
            style="color: #666;"
          >{{ current.address }}</span>
        </div>
        <div style="color: #888;">{{ current.phone }}</div>
        <vs-divider />
        <vs-button
          class="w-full mt-4"
          @click="onSettle(current)"
        >使用这个地址</vs-button>
      </div>
    </div>

    <!-- 弹出框 -->
    <vs-popup
      title="选择收货地址"
      :active.sync="showPopup"
    >
      <ul>
        <li
          class="mb-3 px-10"
          v-for="(item, i) in addressList"
          :key="i"
        >
          <div class="px-2 flex justify-between items-start">
            <vs-chip>{{ item.type }}</vs-chip>
            <div class="flex-1 ml-2">
              <span class="mr-3 text-lg">{{ item.receiver }}</span>
              <span>{{ item.phone }}</span>
              <p class="text-gray-600">{{ item.address }}</p>
            </div>
            <vs-radio
              v-model="addressCheck"
              :vs-value="item"
            ></vs-radio>
          </div>
          <vs-divider v-if="addressList.length !== (i + 1)" />
        </li>
      </ul>

      <div class="mt-8 text-center">
        <vs-button @click="onSelectAddress()">选择这个地址</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const validateReceiver = (rule, value, callback) => {
  if (value.length <= 0) {
    callback(new Error('请填写收货人姓名'))
  } else if (!/^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/.test(value)) {
    callback(new Error('姓名格式不正确'))
  } else {
    callback()
  }
}
const validatePhone = (rule, value, callback) => {
  if (value.length <= 0) {
    callback(new Error('请填写联系电话'))
  } else if (!/^(((13|14|15|18|17)\d{9}))$/.test(value)) {
    callback(new Error('电话号码格式不正确'))
  } else {
    callback()
  }
}

export default {
  name: 'CartAddress',
  data: () => ({
    current: {}, // 当前选择的地址
    addressCheck: null, // 弹框中选择的地址
    showPopup: false,

    rules: {
      receiver: [
        { validator: validateReceiver, trigger: 'blur' },
      ],
      address: [
        { required: true, message: '请填写收货地址' },
      ],
      phone: [
        { validator: validatePhone, trigger: 'blur' },
      ],
      type: [
        { required: true, message: '请选择地址类型' },
      ],
    },
    newAddress: {
      receiver: '',
      address: '',
      phone: '',
      type: '',
    },
  }),

  computed: {
    ...mapState('user', ['addressList', 'defaultAddress']),
  },

  watch: {
    defaultAddress: {
      handler(newVal) {
        if (newVal) {
          this.addressList.forEach((el) => {
            if (el._id === this.defaultAddress) {
              this.current = el
            }
          })
        } else {
          const [curren] = this.addressList
          this.current = curren
        }
      },
      immediate: true,
    },
  },

  methods: {
    // 激活弹出框
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
          try {
            await this.$store.dispatch('user/addAddress', this.newAddress)
            this.onSettle(this.newAddress)
            return true
          } catch {
            return false
          }
        }
        return false
      })
    },

    onResetForm() {
      this.$refs.form.resetFields()
    },

    onSettle(addr) {
      this.$store.commit('cart/SET_ADDRESS', addr)
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
.con-vs-popup::v-deep {
  .vs-popup {
    width: 450px;
  }
}

.btn-group::v-deep {
  .el-form-item__content {
    line-height: inherit;
  }
}
</style>
