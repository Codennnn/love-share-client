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
            label-placeholder="账号"
            v-model="username"
          />
          <vs-input
            class="w-full py-2"
            label-placeholder="密码"
            v-model="password"
          />
          <vs-button
            class="w-full mt-5"
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
      username: '',
      password: '',
      loading: false,
      backgroundLoading: 'primary',
      colorLoading: '#fff',
    };
  },
  methods: {
    login() {
      this.loading = true;
      const data = { username: this.username, password: this.password };
      this.$vs.loading({
        container: this.$refs.vsbtn,
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
