<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "red",
  },
});

// ToDo: to be implemented a new system to assign classes to the button
const buttonClass = computed(() => {
  return `bg-${props.color}-500`;
});
</script>
<template>
  <NuxtLink :class="buttonClass + `custom-button py-2 px-4 `"
    ><slot
  /></NuxtLink>
</template>
