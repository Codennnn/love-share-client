<template>
  <div class="background bg-cover bg-center bg-no-repeat
      flex justify-center items-center
      w-screen h-screen">
    <div class="login-bg bg-cover bg-center bg-no-repeat shadow-2xl rounded">
      <vs-tabs class="w-5/12 h-full text-xl">
        <vs-tab label="登录">
          <!-- 登录 start -->
          <div class="h-full text-base">
            <div class="h-full flex flex-col justify-center items-center">
              <div class="w-4/6">
                <vs-input
                  class="w-full py-2"
                  v-for="(item, index) in loginInput"
                  :type="item.type"
                  :key="index"
                  :placeholder="item.placeholder"
                  :warning="item.isWarnng"
                  :warning-text="item.warningText"
                  val-icon-warning="warning"
                  @focus="inputFocus(index)"
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
                  id="loginBtn"
                  class="w-full mt-2 vs-con-loading__container"
                  type="relief"
                  :disabled="loginBtnDisable"
                  @click="login"
                >登录</vs-button>
              </div>
            </div>
          </div>
          <!-- 登录 end -->
        </vs-tab>

        <vs-tab label="注册">
          <p>请联系管理员添加账号</p>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
const loginInput = [
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
  data() {
    return {
      loginInput,
      loginBtnDisable: false,
      showAlert: false,
    }
  },

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
        container: '#loginBtn',
        scale: 0.45,
      })
      this.loginBtnDisable = true

      const [username, password] = [this.loginInput[0].value, this.loginInput[1].value]

      await this.$store
        .dispatch('user/login', { user_name: username, password })
        .then((code) => {
          if (code === 2000) {
            this.$router.replace('/')
          } else if (code === 3000 || code === 4004) {
            this.showAlert = true
          }
        })
        .catch((err) => {
          console.log(err)
        })

      // 关闭按钮的加载动画
      this.$vs.loading.close('#loginBtn > .con-vs-loading')
      this.loginBtnDisable = false
    },

    // 输入框非空验证
    validate() {
      for (let i = 0; i < 2; i += 1) {
        if (this.loginInput[i].value.length === 0) {
          this.loginInput[i].isWarnng = true
          this.loginInput[i].warningText = (i === 0 ? '请输入账号' : '请输入密码')
          return false
        }
      }
      return true
    },

    // 输入框聚焦时隐藏警示
    inputFocus(i) {
      this.loginInput[i].isWarnng = false
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
