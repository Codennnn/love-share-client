<template>
  <div class="p-6 bg-white rounded-lg">
    <div class="text-xl font-bold text-gray-600">修改密码</div>
    <div class="py-4 flex justify-center">
      <div class="w-1/3">
        <vs-input
          class="w-full py-2"
          val-icon-warning="warning"
          v-for="(item, i) in inputs"
          :key="i"
          :type="item.type"
          :label="item.label"
          :placeholder="item.placeholder"
          :warning="item.isWarnng"
          :warning-text="item.warningText"
          :description-text="item.description"
          v-model.trim="item.value"
          @focus="() => { inputs[i].isWarnng = false }"
        />
        <div class="flex items-center mt-2 py-2">
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
          class="w-full mt-2 vs-con-loading__container"
          type="relief"
          @click="onReset()"
        >重置密码</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/request/api/user'

const inputs = [
  {
    label: '新的密码',
    placeholder: '请输入新的密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
    description: '6-16个字符，只能是字母、数字和下划线的组合',
    reg: /^[\w]{6,16}$/,
  },
  {
    label: '确认密码',
    placeholder: '请二次确认密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
    description: '',
  },
  {
    label: '手机号码',
    placeholder: '请输入已绑定的手机号码',
    value: '',
    type: 'text',
    isWarnng: false,
    warningText: '',
    description: '',
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
      if (!this.validate()) {
        // 非空验证不通过，退出程序
        return
      }
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

      try {
        const { code } = await resetPassword()
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
          await this.$store.dispatch('user/logout')
          this.$router.replace('/login')
        }
      } catch {
        // TODO
      }

      // 关闭按钮的加载动画
      this.$vs.loading.close('#resetBtn > .con-vs-loading')
      this.resetBtnDisable = false
    },

    // 输入框非空验证
    validate() {
      const warningText = {
        0: '请输入密码',
        1: '请确认密码',
        2: '请输入手机号码',
      }
      for (let i = 0; i <= 2; i += 1) {
        if (this.inputs[i].value.length === 0) {
          this.inputs[i].isWarnng = true
          this.inputs[i].warningText = warningText[i]
          return false
        }
      }
      return true
    },

    check() {
      const isValidated = (i) => {
        if (i === 1) {
          if (this.inputs[0].value === this.inputs[1].value) {
            return true
          }
          this.inputs[1].isWarnng = true
          this.inputs[1].warningText = '请确认与新密码一致'
          return false
        }
        if (this.inputs[i].reg.test(this.inputs[i].value)) {
          return true
        }
        this.inputs[i].isWarnng = true
        this.inputs[i].warningText = `请确认${this.inputs[i].placeholder}填写正确`
        return false
      }
      const flags = [0, 1, 2].map(isValidated) // 记录三个输入框的正则状态
      const flag = flags.every(Boolean)
      return flag
    },

    // 获取验证码
    getCode() {
      if (this.validate() && this.check()) {
        if (!this.timer) {
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
  },
}
</script>

<style lang="scss" scoped>
</style>
