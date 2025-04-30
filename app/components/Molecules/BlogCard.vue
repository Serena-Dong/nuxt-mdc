<script setup lang="ts">
import type { BlogCardProps } from "./BlogCard.props";
const props = defineProps<BlogCardProps>();
defineEmits<{
  (e: "deletePost", slug: string): void;
}>();

// Parse the date string to a Date object
const parsedDate = computed(() => new Date(props.date));
</script>

<template>
  <div class="blog-card border-b-2 border-gray-400">
    <NuxtLink class="flex py-4 items-center" :to="`/posts/${slug}`">
      <!-- ID -->
      <div class="basis-1/12">
        <p># {{ postNumber }}</p>
      </div>
      <!-- Content -->
      <div class="basis-7/12">
        <p class="text-xl">{{ title }}</p>
      </div>
      <!-- Actions -->
      <div class="basis-4/12 flex gap-2 items-center justify-between">
        <p class="text-sm text-right">
          <span class="font-bold"> Date: </span>
          {{
            `${parsedDate.getDay()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`
          }}
          <i>
            {{ parsedDate.getHours() }}:{{
              parsedDate.getMinutes() < 10
                ? "0" + parsedDate.getMinutes()
                : parsedDate.getMinutes()
            }}
          </i>
        </p>
        <p class="text-sm text-right hidden items-center gap-2 md:flex">
          Read more<icon name="line-md:arrow-right"></icon>
        </p>
        <button
          class="text-sm text-right hidden items-center gap-2 md:flex cursor-pointer"
          @click.prevent="$emit('deletePost', slug)"
        >
          Delete post<icon name="line-md:arrow-right"></icon>
        </button>
      </div>
    </NuxtLink>
  </div>
</template>
