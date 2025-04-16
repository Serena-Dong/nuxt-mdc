<script setup lang="ts">
const { data: posts } = await useFetch("/api/getMarkdown", { method: "GET" });
</script>
<template>
  <div class="!p-4 md:!p-8 md:!pb-4">
    <h1>Welcome to my blog</h1>
    <h2>Posts list</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
      <MoleculesBlogCard
        v-for="post in posts"
        :key="post.slug"
        :title="post.title"
        :description="post.content"
        :slug="post.slug"
      />
    </div>
  </div>
</template>
