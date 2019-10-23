<template>
  <div class="w-1/2">
    <vs-input
      class="w-full py-2"
      val-icon-warning="warning"
      v-for="(item, i) in inputs"
      :key="i"
      :type="item.type"
      :placeholder="item.placeholder"
      :warning="item.isWarnng"
      :warning-text="item.warningText"
      v-model.trim="item.value"
      @focus="inputsFocus(i)"
      @keyup.enter="login"
    />
  </div>
</template>

<script>
const inputs = [
  {
    placeholder: '您的账号',
    value: '',
    type: 'text',
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '您的密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
  },
]

export default {
  name: 'UserChangePassword',
  data: () => ({
    inputs,
  }),

  methods: {
    async login() {
      if (!this.validate()) {
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
    validate() {
      for (let i = 0; i < 2; i += 1) {
        if (this.inputs[i].value.length === 0) {
          this.inputs[i].isWarnng = true
          this.inputs[i].warningText = (i === 0 ? '请输入账号' : '请输入密码')
          return false
        }
      }
      return true
    },

    inputsFocus(i) {
      this.inputs[i].isWarnng = false
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
