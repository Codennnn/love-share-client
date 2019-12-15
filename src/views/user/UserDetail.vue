<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  data: () => ({
    userId: '',
  }),

  created() {
    this.userId = this.$route.query.userId
  },

}
</script>

<style lang="scss" scoped>
</style>
