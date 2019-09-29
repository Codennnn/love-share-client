<template>
  <div class="background bg-cover bg-center bg-no-repeat
      flex justify-center items-center
      w-screen h-screen">
    <div class="login-bg bg-cover bg-center bg-no-repeat shadow-2xl rounded-lg">
      <vs-tabs class="w-5/12 h-full text-xl">
        <!-- 登录 start -->
        <vs-tab label="登录">
          <div class="h-full text-base">
            <div class="h-full flex flex-col items-center">
              <div class="w-4/6 mt-32">
                <vs-input
                  class="w-full py-2"
                  v-for="(item, i) in signInInput"
                  :key="i"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :warning="item.isWarnng"
                  :warning-text="item.warningText"
                  val-icon-warning="warning"
                  @focus="signInInputFocus(i)"
                  v-model.trim="item.value"
                />
                <vs-alert
                  closable
                  close-icon="close"
                  color='danger'
                  :active.sync="signInError"
                >{{ signInErrorText }}</vs-alert>
                <vs-button
                  id="signInBtn"
                  class="w-full mt-2 vs-con-loading__container"
                  type="relief"
                  :disabled="signInDisable"
                  @click="login"
                >登录</vs-button>
              </div>
            </div>
          </div>
        </vs-tab>
        <!-- 登录 end -->
        <!-- 注册 start -->
        <vs-tab label="注册">
          <div class="h-full text-base">
            <div class="h-full flex flex-col items-center">
              <div class="w-4/6 mt-20">
                <vs-input
                  class="w-full py-2"
                  v-for="(item, i) in signUpInput"
                  :key="i"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :description-text="item.description"
                  :warning="item.isWarnng"
                  :warning-text="item.warningText"
                  val-icon-warning="warning"
                  @focus="signUpInputFocus(i)"
                  v-model.trim="item.value"
                />
                <div class="flex items-center py-2">
                  <vs-input
                    class="w-7/12 mr-2"
                    placeholder="验证码"
                    :warning="codeError"
                    :warning-text="codeWarningText"
                    val-icon-warning="warning"
                    @focus="codeError = false"
                    v-model.trim="code"
                  />
                  <vs-button
                    class="w-5/12"
                    type="border"
                    @click="getCode"
                  >{{ codeText }}</vs-button>
                </div>
                <vs-alert
                  closable
                  close-icon="close"
                  color='danger'
                  :active.sync="signUpError"
                >{{ signUpErrorText }}</vs-alert>
                <vs-button
                  id="signUpBtn"
                  class="w-full mt-2 vs-con-loading__container"
                  type="relief"
                  :disabled="signUpDisable"
                  @click="register"
                >立即注册</vs-button>
              </div>
            </div>
          </div>
        </vs-tab>
        <!-- 注册 end -->
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import { setInterval } from 'timers'
import { register } from '@/request/api/user'

const signInInput = [
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
const signUpInput = [
  {
    placeholder: '昵称',
    value: '',
    type: 'text',
    description: '只能是中文、字母、数字',
    reg: /^[1]([3-9])[0-9]{9}$/,
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '密码',
    value: '',
    type: 'password',
    description: '密码应由6-16个字符组成，区分大小写',
    reg: /^[1]([3-9])[0-9]{9}$/,
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '手机号码',
    value: '',
    type: 'text',
    description: '',
    reg: /^[1]([3-9])[0-9]{9}$/,
    isWarnng: false,
    warningText: '',
  },
]

export default {
  data: () => ({
    signInInput,
    signUpInput,
    signInError: false,
    signUpError: false,
    signUpErrorText: '账号或密码有误，请重新输入',
    signInErrorText: '注册失败',
    signInDisable: false,
    signUpDisable: false,
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

    async register() {
      if (!this.validate('signUp')) {
        // 非空验证不通过，退出程序
        return
      }

      if (!this.registerValidate()) {
        return
      }

      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#signUpBtn',
        scale: 0.45,
      })
      this.signUpDisable = true

      try {
        await register()
      } catch (err) {
        console.log(err)
        this.signUpError = true
      } finally {
        this.$vs.loading.close('#signUpBtn > .con-vs-loading')
        this.signInDisable = false
      }
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

      if (flag === 'signUp') {
        const text = {
          0: '请输入昵称',
          1: '请输入密码',
          2: '请输入手机号码',
        }
        for (let i = 0; i < 3; i += 1) {
          if (this.signUpInput[i].value.length === 0) {
            this.signUpInput[i].isWarnng = true
            this.signUpInput[i].warningText = text[i]
            return false
          }
        }
        if (this.code.length <= 0) {
          this.codeError = true
          this.codeWarningText = '请填入验证码'
          return false
        }
      }
      return true
    },

    registerValidate() {
      const isValidated = (i) => {
        if (this.signUpInput[i].reg.test(this.signUpInput[i].value)) {
          return true
        }
        this.signUpInput[i].isWarnng = true
        this.signUpInput[i].warningText = `请确认${this.signUpInput[i].placeholder}填写正确`
        return false
      }
      const flags = [0, 1, 2].map(isValidated)
      const flag = flags.every(Boolean)
      console.log(flags, flag)
      return flag
    },

    // 获取验证码
    getCode() {
      let count = 60
      if (!this.timer) {
        this.codeText = `${count}s`
        this.timer = setInterval(() => {
          if (count > 0) {
            count -= 1
            this.codeText = `${count}s`
          } else {
            clearInterval(this.timer)
            this.codeText = '获取验证码'
          }
        }, 1000)
      }
    },

    // 输入框聚焦时隐藏警示
    signInInputFocus(i) {
      this.signInInput[i].isWarnng = false
    },
    signUpInputFocus(i) {
      this.signUpInput[i].isWarnng = false
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url("~@/assets/images/pages/login/background.png");
}

.login-bg {
  min-width: 1000px;
  height: 562px;
  background-image: url("~@/assets/images/pages/login/login_bg.png");
}

#signInBtn,
#signUpBtn {
  &:hover {
    color: #fff !important; // 修正样式
  }
}

// 重置tab选项卡的高度
.vs-tabs::v-deep {
  .con-slot-tabs {
    height: calc(562px - 50px);
    & .vs-tabs--content {
      height: 100%;
    }
  }
}

#loginBtn:hover {
  color: #fff !important;
}
</style>
