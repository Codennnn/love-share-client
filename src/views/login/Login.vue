<template>
  <div class="background
      flex justify-center items-center
      w-screen h-screen">
    <div class="login-bg shadow-2xl rounded">
      <div class="login-form-wrapper w-5/12 h-full
      flex flex-col justify-center items-center">
        <img
          class="w-3/12 mb-5"
          src="@/assets/images/pages/login/logo.png"
        />
        <div class="w-4/6">
          <h1>登 录</h1>
          <vs-input
            class="w-full py-2"
            v-for="(item, index) in loginInput"
            :type="item.type"
            :key="index"
            :placeholder="item.placeholder"
            :warning="item.isWarnng"
            :warning-text="item.warningText"
            val-icon-warning="warning"
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
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginInput: [{
        placeholder: '请输入账号',
        value: '',
        type: 'text',
        isWarnng: false,
        warningText: '',
      }, {
        placeholder: '请输入密码',
        value: '',
        type: 'password',
        isWarnng: false,
        warningText: '',
      }],
    };
  },
  methods: {
    login() {
      const [username, password] = [this.loginInput[0].value, this.loginInput[1].value];

      if (username.length === 0 || password.length === 0) {
        this.loginInput[0].isWarnng = true;
        return;
      }

      console.log('登录信息：', { username, password });

      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#loginBtn',
        scale: 0.45,
      });
      // login(data).then((res) => {
      //   console.log(res);
      // });
      setTimeout(() => {
        // this.$router.replace({ name: 'analytics' });
        this.$vs.loading.close('#loginBtn > .con-vs-loading');
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: url("~@/assets/images/pages/login/background.png") no-repeat
    center center;
  background-size: cover;
}

.login-bg {
  min-width: 1000px;
  height: 562px;
  background: url("~@/assets/images/pages/login/login_bg.png") no-repeat center
    center;
  background-size: cover;
}
</style>
