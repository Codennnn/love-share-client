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
                <vs-button
                  id="loginBtn"
                  class="w-full mt-2 vs-con-loading__container"
                  type="relief"
                  @click="login"
                >登录</vs-button>
              </div>
            </div>
          </div>
          <!-- 登录 end -->
        </vs-tab>
        <vs-tab label="注册">
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInput: [{
        placeholder: '您的账号',
        value: '',
        type: 'text',
        isWarnng: false,
        warningText: '',
      }, {
        placeholder: '您的密码',
        value: '',
        type: 'password',
        isWarnng: false,
        warningText: '',
      }],
    };
  },

  methods: {
    async login() {
      if (!this.validate()) {
        // 非空验证不通过，退出程序
        return;
      }

      // 显示登录按钮的加载动画
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#loginBtn',
        scale: 0.45,
      });

      const [username, password] = [this.loginInput[0].value, this.loginInput[1].value];

      await this.$store.dispatch('user/login', { username, password });
      this.$router.replace('/');

      // 关闭按钮的加载动画
      this.$vs.loading.close('#loginBtn > .con-vs-loading');
    },

    // 输入框非空验证
    validate() {
      for (let i = 0; i < 2; i += 1) {
        if (this.loginInput[i].value.length === 0) {
          this.loginInput[i].isWarnng = true;
          this.loginInput[i].warningText = (i === 0 ? '请输入账号' : '请输入密码');
          return false;
        }
      }
      return true;
    },

    // 输入框聚焦时隐藏警示
    inputFocus(i) {
      this.loginInput[i].isWarnng = false;
    },
  },
};
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

.vs-tabs::v-deep {
  .con-slot-tabs {
    height: calc(562px - 44px);
    & .vs-tabs--content {
      height: 100%;
    }
  }
}

#loginBtn:hover {
  color: #fff !important;
}
</style>
