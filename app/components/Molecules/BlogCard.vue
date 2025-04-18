<script setup lang="ts">
import type { BlogCardProps } from "./BlogCard.props";
const props = defineProps<BlogCardProps>();

// Parse the date string to a Date object
const parsedDate = computed(() => new Date(props.date));
</script>

<template>
  <div
    class="blog-card border border-gray-200 rounded-lg p-4 mb-4 hover:bg-gray-50 transition-colors duration-200"
  >
    <NuxtLink :to="`/posts/${slug}`" class="block">
      <p class="text-sm text-right">
        {{
          `${parsedDate.getDay()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`
        }}
      </p>
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600 line-clamp-4 truncate">
        <Suspense suspensible>
          <MDC :value="description" unwrap="p" />
        </Suspense>
      </p>
    </NuxtLink>
  </div>
</template>
