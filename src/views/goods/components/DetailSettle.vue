<template>
  <vs-popup
    fullscreen
    title="确认购买信息"
    :active.sync="showPopup"
  >
  </vs-popup>
</template>

<script>
export default {
  name: 'DetailSettle',
  data: () => ({
    showPopup: true,
  }),
}
</script>
