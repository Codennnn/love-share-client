<template>
  <div class="mt-40">
    <p class="w-full pb-4 text-2xl font-bold">
      欢迎登录
    </p>
    <vs-input
      class="w-full pb-1"
      val-icon-warning="warning"
      val-icon-danger="clear"
      color="rgb(91, 143, 255)"
      v-for="(item, i) in signInInput"
      :key="i"
      :type="item.type"
      :label-placeholder="item.placeholder"
      :warning="item.isWarnng"
      :warning-text="item.warningText"
      :danger="item.isError"
      :danger-text="item.errorText"
      v-model.trim="item.value"
      @focus="item.isWarnng = false, item.isError = false"
      @keyup.enter="i === 1 ? onSignIn() : ''"
    />
    <vs-alert
      closable
      close-icon="close"
      color='danger'
      :active.sync="signInAlert"
    >{{ signInAlertText }}</vs-alert>
    <span
      class="text-sm text-gray-500 transition cursor-pointer hover:text-blue-600"
      @click="switchTo('SignReset', '重置密码')"
    >忘记密码？</span>
    <vs-button
      id="signInBtn"
      class="w-full mt-3 mb-1 vs-con-loading__container"
      color="rgb(103, 123, 255)"
      gradient-color-secondary="rgb(91, 143, 255)"
      type="gradient"
      :disabled="signInDisable"
      @click="onSignIn()"
    >登 录</vs-button>
    <div class="text-right">
      <span
        class="text-sm text-gray-500 transition cursor-pointer hover:text-blue-600"
        @click="switchTo('SignUp', '注册')"
      >还没有账号，去注册</span>
    </div>
  </div>
</template>

<script>
const signInInput = [
  {
    placeholder: '手机号或邮箱',
    value: '',
    type: 'text',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '账号不能为空，请输入账号',
    noneCheckText: '该账号尚未注册',
  },
  {
    placeholder: '密码',
    value: '',
    type: 'password',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    noneEmptyText: '密码不能为空，请输入密码',
    noneCheckText: '密码有误，请重新输入',
  },
]

export default {
  name: 'SignIn',
  data: () => ({
    signInInput,
    signInAlert: false,
    signInAlertText: '登录失败',
    signInDisable: false,
  }),

  methods: {
    async onSignIn() {
      // 非空验证不通过，退出
      if (!this.validate()) {
        return
      }

      // 手机号码格式不正确，退出
      const accountReg = /(^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8]\d{9}$)/
      if (!accountReg.test(this.signInInput[0].value)) {
        this.signInInput[0].isError = true
        this.signInInput[0].errorText = '请确认手机号或邮箱的格式是否填写正确'
        return
      }

      // 显示登录按钮的加载动画
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#signInBtn',
        scale: 0.45,
      })
      this.signInDisable = true

      const [account, password] = [this.signInInput[0].value, this.signInInput[1].value]

      try {
        const code = await this.$store.dispatch('user/signIn', { account, password })
        if (code === 2000) {
          await this.$store.dispatch('user/getUserInfo')
          this.$router.replace('/')
        } else if (code === 4001) {
          // 4001 - 账号未注册
          this.signInInput[0].isError = true
          this.signInInput[0].errorText = this.signInInput[0].noneCheckText
        } else if (code === 4003) {
          // 4003 - 密码错误
          this.signInInput[1].isError = true
          this.signInInput[1].errorText = this.signInInput[1].noneCheckText
        }
      } catch (err) {
        this.signInAlert = true
        this.signInAlertText = `登录失败 - ${err}`
      } finally {
        // 关闭按钮的加载动画
        this.$vs.loading.close('#signInBtn > .con-vs-loading')
        this.signInDisable = false
      }
    },

    // 输入框非空验证
    validate() {
      return this.signInInput.every((input) => {
        if (input.value.length <= 0) {
          input.isWarnng = true
          input.warningText = input.noneEmptyText
          return false
        }
        return true
      })
    },

    switchTo(name, title) {
      this.$emit('switchComponent', name)
      document.title = `${title} - 乐享校园`
    },
  },
}
</script>
