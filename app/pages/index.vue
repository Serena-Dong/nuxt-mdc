<script setup lang="ts">
const { data: posts } = await useFetch("/api/getMarkdown", { method: "GET" });
</script>
<template>
  <div class="min-h-full p-4 pt-0 md:p-8 md:!pt-0">
    <div class="flex items-center justify-center mb-4 md:mb-8">
      <h1 class="uppercase text-7xl md:text-8xl">Minimal Blog</h1>
    </div>
    <div v-if="posts?.length" class="">
      <MoleculesBlogCard v-for="post in posts" :key="post.slug" v-bind="post" />
    </div>
    <div v-else class="py-5 text-center">
      <p class="text-gray-500">
        No posts available at the moment. Check back later!
      </p>
    </div>
  </div>
</template>
