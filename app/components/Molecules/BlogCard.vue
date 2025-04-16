<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  slug: string;
}>();
</script>

<template>
  <div
    class="border border-gray-200 rounded-lg p-4 mb-4 hover:bg-gray-50 transition-colors duration-200"
  >
    <NuxtLink :to="`/posts/${slug}`" class="block">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600 line-clamp-4 truncate">
        <Suspense suspensible>
          <MDC :value="description" unwrap="p" />
        </Suspense>
      </p>
    </NuxtLink>
  </div>
</template>
