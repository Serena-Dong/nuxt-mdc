<script setup lang="ts">
const { data: posts } = await useFetch("/api/getMarkdown", { method: "GET" });
</script>
<template>
  <div class="!p-4 md:!p-8 md:!pb-4 min-h-full">
    <h1>Welcome to my blog</h1>
    <h2>Posts list</h2>
    <div
      v-if="posts?.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5"
    >
      <MoleculesBlogCard v-for="post in posts" :key="post.slug" v-bind="post" />
    </div>
    <div v-else class="py-5 text-center">
      <p class="text-gray-500">
        No posts available at the moment. Check back later!
      </p>
    </div>
  </div>
</template>
