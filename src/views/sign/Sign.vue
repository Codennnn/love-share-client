<template>
  <div
    class="relative min-h-screen flex-row-center"
    style="background: rgb(239, 242, 247);"
  >
    <div
      class="absolute z-50 flex items-center text-lg text-gray-600 font-bold"
      style="top: 2rem; left: 4rem;"
    >
      <img
        class="w-12 mr-6"
        src="@/assets/images/logo.png"
      >
      <router-link
        class="mr-4"
        to="/home"
      >首 页</router-link>
      <router-link
        class="mr-4"
        to="/home"
      >帮助中心</router-link>
    </div>

    <div
      class="relative flex justify-end bg-white radius overflow-hidden"
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
const SignReset = Vue.component(
  'SignReset',
  () => import('./components/SignReset.vue'),
)

export default {
  name: 'Sign',
  components: { SignIn, SignUp, SignReset },

  data: () => ({
    currentComponent: 'SignIn',
  }),

  mounted() {
    this.currentComponent = this.$route?.query?.sign || 'SignIn'
  },

  methods: {
    switchCom(component) {
      this.currentComponent = component
    },
  },
}
</script>
