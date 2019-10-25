<template>
  <div class="flex items-center">
    <div class="mr-6 w-20 text-right text-gray-600">{{ label }}</div>
    <span>{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>
