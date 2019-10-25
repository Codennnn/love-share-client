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
                  val-icon-warning="warning"
                  v-for="(item, i) in signInInput"
                  :key="i"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :warning="item.isWarnng"
                  :warning-text="item.warningText"
                  v-model.trim="item.value"
                  @focus="() => { signInInput[i].isWarnng = false }"
                  @keyup.enter="login"
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
            <div class="h-full flex flex-col items-center justify-center">
              <div class="w-4/6">
                <div class="overflow-hidden">
                  <vs-select
                    autocomplete
                    class="mb-1"
                    label="请选择您的学校"
                    width="100%"
                    @input-change="schoolChange"
                    v-model="school"
                  >
                    <vs-select-item
                      v-for="(item, i) in schools"
                      :key="i"
                      :value="item.value"
                      :text="item.label"
                    />
                  </vs-select>
                </div>
                <vs-input
                  class="w-full"
                  v-for="(item, i) in signUpInput"
                  :key="i"
                  :type="item.type"
                  :label-placeholder="item.placeholder"
                  :description-text="item.description"
                  :warning="item.isWarnng"
                  :warning-text="item.warningText"
                  val-icon-warning="warning"
                  @focus="() => { signUpInput[i].isWarnng = false }"
                  v-model.trim="item.value"
                />
                <div class="flex items-center mt-2 py-2">
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
                    class="w-5/12 text-sm"
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
import { register } from '@/request/api/user'
import { getSchools } from '@/request/api/common'

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
    reg: /^[0-9a-zA-Z_]{1,}$/,
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '密码',
    value: '',
    type: 'password',
    description: '6-16个字符，只能是字母、数字和下划线',
    reg: /^[\w]{6,16}$/,
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
  name: 'Login',
  data: () => ({
    signInInput,
    signUpInput,
    school: 1000,
    schools: [],
    signInError: false,
    signUpError: false,
    signInErrorText: '账号或密码有误，请重新输入',
    signUpErrorText: '注册失败',
    signInDisable: false,
    signUpDisable: false,
    codeError: false,
    code: '', // 验证码
    codeText: '获取验证码',
    codeWarningText: '',
    timer: null,
  }),

  mounted() {
    this.getSchools()
  },

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

      // 如果注册校验不通过，终止
      if (!this.registerCheck()) {
        return
      }

      if (this.code.length <= 0) {
        this.codeError = true
        this.codeWarningText = '请填入验证码'
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
      }
      return true
    },

    registerCheck() {
      const isValidated = (i) => {
        if (this.signUpInput[i].reg.test(this.signUpInput[i].value)) {
          return true
        }
        this.signUpInput[i].isWarnng = true
        this.signUpInput[i].warningText = `请确认${this.signUpInput[i].placeholder}填写正确`
        return false
      }
      const flags = [0, 1, 2].map(isValidated) // 记录三个输入框的正则状态
      const flag = flags.every(Boolean)
      return flag
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

    schoolChange() {},

    async getSchools() {
      try {
        const { code, data } = await getSchools()
        if (code === 2000) {
          this.schools = data.schools
        }
      } catch {
        // TODO
      }
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

.con-select {
  &::v-deep .vs-select--input {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
