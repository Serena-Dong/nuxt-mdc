<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "red",
  },
});
</script>
<template>
  <NuxtLink :class="`custom-button bg-${color}-500 py-2 px-4`"
    ><slot
  /></NuxtLink>
</template>
