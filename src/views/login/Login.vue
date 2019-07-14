<template>
  <div class="background bg-cover bg-center bg-no-repeat
      flex justify-center items-center
      w-screen h-screen">
    <div class="login-bg bg-cover bg-center bg-no-repeat shadow-2xl rounded">
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
  </div>
</template>

<script>
import { login } from '@/request/api/login';

export default {
  name: 'login',
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
      const [username, password] = [this.loginInput[0].value, this.loginInput[1].value];

      if (!this.validate(username, password)) {
        return;
      }

      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#loginBtn',
        scale: 0.45,
      });

      try {
        const res = await login();
        console.log('响应', res);
      } catch (e) {
        console.log('====出错了====');
      }
      // console.log('登录信息：', { username, password });

      // this.$router.replace({ name: 'analytics' });
      this.$vs.loading.close('#loginBtn > .con-vs-loading');
    },

    validate(uname, pwd) {
      if (uname.length === 0) {
        this.loginInput[0].isWarnng = true;
        this.loginInput[0].warningText = '请输入账号';
        return false;
      }
      if (pwd.length === 0) {
        this.loginInput[1].isWarnng = true;
        this.loginInput[1].warningText = '请输入密码';
        return false;
      }
      return true;
    },

    inputFocus(e) {
      if (e === 0) {
        this.loginInput[0].isWarnng = false;
      } else if (e === 1) {
        this.loginInput[1].isWarnng = false;
      }
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
</style>
