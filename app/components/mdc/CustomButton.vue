<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'red',
  },
})

const buttonClass = computed(() => {
  switch (props.color) {
    case 'green':
      return 'bg-green-500 hover:bg-green-600'
    case 'blue':
      return 'bg-blue-500 hover:bg-blue-600'
    case 'yellow':
      return 'bg-yellow-500 hover:bg-yellow-600'
    case 'red':
      return 'bg-red-500 hover:bg-red-600'
    default:
      return 'bg-gray-500 hover:bg-gray-600'
  }
})
</script>
<template>
  <button :class="[buttonClass, `custom-button rounded px-4 py-2`]">
    <MDCSlot />
  </button>
</template>
