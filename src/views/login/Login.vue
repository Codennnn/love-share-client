<template>
  <div class="bg container">
    <div class="login-bg">
      <div class="login-form-wrapper">
        <div>
          <img
            src="@/assets/images/pages/login/logo.png"
            style="width:30%"
          >
        </div>
        <div class="label">
          <h1>登 录</h1>
        </div>
        <div class="input-wrapper">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="username"
            class="input"
          ></el-input>
        </div>
        <div class="input-wrapper">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="password"
            show-password
            class="input"
            @keyup.enter.native="login"
          ></el-input>
        </div>
        <div class="login-btn-wrapper">
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="login"
          >登 录</el-button>
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
      disabled: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      const data = { username: this.username, password: this.password };
      console.log(data);
      // login(data).then((res) => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.$router.replace({ name: 'analytics' });
        this.loading = false;
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: url("../../assets/images/pages/login/background.png") no-repeat
    center center;
  background-size: cover;
}

.login-bg {
  width: 1000px;
  height: 562px;
  background: url("../../assets/images/pages/login/login_bg.png") no-repeat
    center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 0 20px #616161;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-wrapper {
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.label {
  width: 230px;
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
}

.input-wrapper {
  margin-bottom: 20px;
}

.input {
  width: 230px;
}

.login-btn-wrapper {
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tip {
  margin-left: 8px;
  font-size: 15px;
  color: #afafaf;
}
</style>
