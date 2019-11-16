<template>
  <div class="mt-40">
    <p class="w-full pb-4 text-2xl font-bold text-gray-700">
      欢迎登录
    </p>
    <vs-input
      class="w-full pb-1"
      val-icon-warning="warning"
      color="rgb(91, 143, 255)"
      v-model.trim="item.value"
      v-for="(item, i) in signInInput"
      :key="i"
      :type="item.type"
      :label-placeholder="item.placeholder"
      :warning="item.isWarnng"
      :warning-text="item.warningText"
      @focus="() => { signInInput[i].isWarnng = false }"
      @keyup.enter="login"
    />
    <vs-alert
      closable
      close-icon="close"
      color='danger'
      :active.sync="signInError"
    >{{ signInErrorText }}</vs-alert>
    <span
      class="text-sm text-gray-500 cursor-pointer hover:text-blue-600"
      style="transition: 0.4s;"
    >忘记密码？</span>
    <vs-button
      id="signInBtn"
      class="w-full mt-3 mb-1 vs-con-loading__container"
      color="rgb(103, 123, 255)"
      gradient-color-secondary="rgb(91, 143, 255)"
      type="gradient"
      :disabled="signInDisable"
      @click="login"
    >登 录</vs-button>
    <div class="text-right">
      <span
        class="text-sm text-gray-500 cursor-pointer hover:text-blue-600"
        style="transition: 0.4s;"
        @click="switchToSignUp()"
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
    warningText: '',
  },
  {
    placeholder: '密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
  },
]

export default {
  name: 'SignIn',
  data: () => ({
    signInInput,
    signInError: false,
    signInErrorText: '账号或密码有误，请重新输入',
    signInDisable: false,
    codeError: false,
    code: '', // 验证码
    codeText: '获取验证码',
    codeWarningText: '',
    timer: null,
  }),

  methods: {
    async login() {
      if (!this.validate('signIn')) {
        // 非空验证不通过，退出程序
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

      const [username, password] = [this.signInInput[0].value, this.signInInput[1].value]

      const code = await this.$store.dispatch('user/login', { username, password })

      if (code === 2000) {
        this.$router.replace('/')
      } else if (code === 3000 || code === 4004) {
        // 3000 - 账号错误，4004 - 密码错误
        this.signInError = true
      }
      // 关闭按钮的加载动画
      this.$vs.loading.close('#signInBtn > .con-vs-loading')
      this.signInDisable = false
    },

    // 输入框非空验证
    validate(flag) {
      if (flag === 'signIn') {
        for (let i = 0; i < 2; i += 1) {
          if (this.signInInput[i].value.length === 0) {
            this.signInInput[i].isWarnng = true
            this.signInInput[i].warningText = (i === 0 ? '请输入账号' : '请输入密码')
            return false
          }
        }
        return true
      }
      return true
    },

    // 获取验证码
    getCode() {
      if (this.validate('signUp') && this.registerCheck()) {
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

    switchToSignUp() {
      this.$emit('switchComponent', 'SignUp')
      document.title = '注册 - 乐享校园'
    },
  },
}
</script>

<style lang="scss" scoped>
#signInBtn {
  &:hover {
    color: #fff !important; // 修正样式
  }
}
</style>
