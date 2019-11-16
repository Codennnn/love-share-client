<template>
  <div class="mt-8">
    <p class="w-full pb-2 text-2xl font-bold text-gray-700">
      注册新用户
    </p>
    <div class="overflow-hidden">
      <vs-select
        autocomplete
        class="mb-1"
        label="您的学校"
        placeholder="请选择您的学校"
        width="100%"
        v-model="school"
      >
        <vs-select-item
          v-for="(item, i) in schoolList"
          :key="i"
          :value="item"
          :text="item"
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
      class="w-full mt-2 mb-1 vs-con-loading__container"
      color="rgb(103, 123, 255)"
      gradient-color-secondary="rgb(var(--vs-primary), 1)"
      type="gradient"
      :disabled="signUpDisable"
      @click="register"
    >立即注册</vs-button>
    <div class="text-right">
      <span
        class="text-sm text-gray-500 cursor-pointer hover:text-blue-600"
        style="transition: 0.4s;"
        @click="switchToSignIn()"
      >已有账号，立即登录</span>
    </div>
  </div>
</template>

<script>
import { register } from '@/request/api/user'
import { getSchoolList } from '@/request/api/common'

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
    placeholder: '确认密码',
    value: '',
    type: 'password',
    description: '再次确认密码，请输入相同的密码',
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
  name: 'SignIn',
  data: () => ({
    signUpInput,
    signUpError: false,
    signUpErrorText: '注册失败',
    signUpDisable: false,
    school: '',
    schoolList: [],
    codeError: false,
    code: '', // 验证码
    codeText: '获取验证码',
    codeWarningText: '',
    timer: null,
  }),

  mounted() {
    this.getSchoolList()
  },

  methods: {
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

    async getSchoolList() {
      try {
        const { code, data } = await getSchoolList()
        if (code === 2000) {
          this.schoolList = data.school_list
        }
      } catch {
        // TODO
      }
    },

    switchToSignIn() {
      this.$emit('switchComponent', 'SignIn')
      document.title = '登录 - 乐享校园'
    },
  },
}
</script>

<style lang="scss" scoped>
#signInBtn {
  &:hover {
    color: #fff !important; // 修正样式
  }
}

.con-select {
  &::v-deep .vs-select--input {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
