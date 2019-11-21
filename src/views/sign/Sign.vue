<template>
  <div
    class="relative h-screen py-40 flex justify-center items-center"
    style="background: rgb(239, 242, 247);"
  >
    <div
      class="absolute flex items-center"
      style="top: 2rem; left: 4rem;"
    >
      <img
        class="w-12 mr-6"
        src="@/assets/images/logo.png"
      >
      <router-link
        class="text-xl font-bold text-gray-600"
        to="/home"
      >Home</router-link>
    </div>

    <div
      class="relative flex justify-end bg-white rounded-lg overflow-hidden"
      style="min-width: 1000px;"
    >
      <div
        class="absolute top-0 h-full w-64 text-base overflow-hidden"
        style="left: 7rem;"
      >
        <transition
          enter-active-class="animated slideInLeft quickly"
          leave-active-class="animated slideOutRight quickly"
          mode="out-in"
        >
          <keep-alive>
            <component
              :is="currentComponent"
              @switchComponent="switchCom"
            />
          </keep-alive>
        </transition>
      </div>

      <img
        class="w-2/3"
        src="@/assets/images/pages/login/bg.png"
      >
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SignIn from './components/SignIn.vue'

const SignUp = Vue.component(
  'SignUp',
  () => import('./components/SignUp.vue'),
)

export default {
  name: 'Sign',
  data: () => ({
    currentComponent: 'SignIn', // 默认加载 “登录” 表单
  }),

  components: { SignIn, SignUp },

  methods: {
    switchCom(component) {
      this.currentComponent = component
    },
  },
}
</script>

<style lang="scss" scoped>
.quickly {
  animation-duration: 0.2s;
}
</style>
