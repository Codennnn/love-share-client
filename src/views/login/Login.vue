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
                  :active.sync="showAlert"
                >
                  账号或密码有误，请重新输入
                </vs-alert>
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
              <div class="w-4/6 mt-32">
                <vs-input
                  class="w-full py-2"
                  v-for="(item, i) in signUpInput"
                  :key="i"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :warning="item.isWarnng"
                  :warning-text="item.warningText"
                  val-icon-warning="warning"
                  @focus="signUpInputFocus(i)"
                  v-model.trim="item.value"
                />
                <vs-alert
                  closable
                  close-icon="close"
                  color='danger'
                  :active.sync="showAlert"
                >
                  账号或密码有误，请重新输入
                </vs-alert>
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
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '密码（6-16个字符组成，区分大小写）',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '手机号码',
    value: '',
    type: 'text',
    isWarnng: false,
    warningText: '',
  },
]

export default {
  data: () => ({
    signInInput,
    signUpInput,
    signInDisable: false,
    signUpDisable: false,
    showAlert: false,
  }),

  methods: {
    login() {
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

      this.$store
        .dispatch('user/login', { user_name: username, password })
        .then((code) => {
          if (code === 2000) {
            this.$router.replace('/')
          } else if (code === 3000 || code === 4004) {
            this.showAlert = true
          }
        })

      // 关闭按钮的加载动画
      this.$vs.loading.close('#signInBtn > .con-vs-loading')
      this.signInDisable = false
    },

    // 输入框非空验证
    validate() {
      for (let i = 0; i < 2; i += 1) {
        if (this.signInInput[i].value.length === 0) {
          this.signInInput[i].isWarnng = true
          this.signInInput[i].warningText = (i === 0 ? '请输入账号' : '请输入密码')
          return false
        }
      }
      return true
    },

    // 输入框聚焦时隐藏警示
    signInInputFocus(i) {
      this.signInInput[i].isWarnng = false
    },
    signUpInputFocus(i) {
      this.signUpInput[i].isWarnng = false
    },

    register() {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#signUpBtn',
        scale: 0.45,
      })
      this.signUpDisable = true
      this.$vs.loading.close('#signUpBtn > .con-vs-loading')
      this.signInDisable = false
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
