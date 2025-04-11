<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div
    class="border border-gray-200 rounded-lg p-4 mb-4 hover:bg-gray-50 transition-colors duration-200"
  >
    <a href="https://example.com/page2" class="block">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600 line-clamp-2">
        {{ description }}
      </p>
    </a>
  </div>
</template>
