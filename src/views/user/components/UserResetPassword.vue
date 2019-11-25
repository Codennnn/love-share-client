<template>
  <div class="p-6 bg-white rounded-lg">
    <div class="text-xl font-bold text-gray-600">修改密码</div>
    <vs-divider />
    <div class="py-4 flex justify-center">
      <div class="w-1/3">
        <vs-input
          class="w-full py-2"
          val-icon-warning="warning"
          val-icon-danger="clear"
          v-for="(item, i) in inputs"
          :key="i"
          :type="item.type"
          :label="item.label"
          :placeholder="item.placeholder"
          :warning="item.isWarnng"
          :warning-text="item.warningText"
          :danger="item.isError"
          :danger-text="item.errorText"
          :description-text="item.description"
          v-model.trim="item.value"
          @focus="() => { item.isWarnng = false, item.isError = false }"
        />
        <div class="flex items-center py-2">
          <vs-input
            class="w-7/12 mr-2"
            placeholder="验证码"
            :warning="codeError"
            :warning-text="codeWarningText"
            val-icon-warning="warning"
            @focus="codeError = false"
            @keyup.enter="onReset()"
            v-model.trim="code"
          />
          <vs-button
            class="w-5/12 text-sm"
            type="border"
            @click="getCode()"
          >{{ codeText }}</vs-button>
        </div>
        <vs-button
          id="resetBtn"
          class="w-full mt-3 vs-con-loading__container"
          type="relief"
          @click="onReset()"
        >重置密码</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/request/api/user'
import { getVerificationCode } from '@/request/api/common'

const inputs = [
  {
    label: '新的密码',
    placeholder: '请输入新的密码',
    value: '',
    type: 'password',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    description: '6-16个字符，只能是字母、数字和下划线的组合',
    reg: /^[\w]{6,16}$/,
  },
  {
    label: '确认密码',
    placeholder: '请二次确认密码',
    value: '',
    type: 'password',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    description: '',
    reg: /^[\w]{6,16}$/,
  },
  {
    label: '手机号码',
    placeholder: '请输入手机号码',
    value: '',
    type: 'text',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    description: '注册时绑定的手机号码',
    reg: /^[1]([3-9])[0-9]{9}$/,
  },
]

export default {
  name: 'UserChangePassword',
  data: () => ({
    inputs,
    codeError: false,
    code: '', // 验证码
    codeText: '获取验证码',
    codeWarningText: '',
    timer: null,
    resetBtnDisable: false,
  }),

  methods: {
    async onReset() {
      if (this.validate() && this.check()) {
        if (this.code.length <= 0) {
          this.codeError = true
          this.codeWarningText = '验证码不能为空'
          return
        }

        // 显示登录按钮的加载动画
        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#resetBtn',
          scale: 0.45,
        })
        this.resetBtnDisable = true

        const { code } = await resetPassword({
          phone: this.inputs[2].value,
          password: this.inputs[0].value,
        })
        if (code === 2000) {
          this.$vs.notify({
            fixed: true,
            title: '重置密码成功',
            text: '请重新登录（点击关闭）',
            color: 'success',
            position: 'top-right',
            icon: 'check_box',
          })
          // 重新登录
          await this.$store.dispatch('user/signOut')
          this.$router.replace('/sign')
        }

        // 关闭按钮的加载动画
        this.$vs.loading.close('#resetBtn > .con-vs-loading')
        this.resetBtnDisable = false
      }
    },

    // 非空校验
    validate() {
      return this.inputs.every((el) => {
        if (el.value.length <= 0) {
          el.isWarnng = true
          el.warningText = '此项不能为空'
          return false
        }
        return true
      })
    },

    // 格式校验
    check() {
      if (this.inputs[0].value !== this.inputs[1].value) {
        this.inputs[1].isError = true
        this.inputs[1].errorText = '二次密码与前一次不一致'
        return false
      }

      return this.inputs.every((el) => {
        if (!el.reg.test(el.value)) {
          el.isError = true
          el.errorText = '格式不正确'
          return false
        }
        return true
      })
    },

    // 获取验证码
    getCode() {
      if (this.validate() && this.check()) {
        if (!this.timer) {
          this.getVerificationCode()
          let count = 60
          this.codeText = `${count}s`
          this.timer = setInterval(() => {
            if (count > 0) {
              count -= 1
              this.codeText = `${count}s`
            } else {
              clearInterval(this.timer)
              this.timer = null
              count = 60
              this.codeText = '重新发送'
            }
          }, 1000)
        }
      }
    },

    async getVerificationCode() {
      const { code, data } = await getVerificationCode()
      if (code === 2000) {
        this.code = data.code
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>