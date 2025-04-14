<script setup lang="ts">
const { data } = await useFetch("/api/getSnippet/alert");
</script>
<template>
  <div class="!p-4 md:!p-8 md:!pb-4">
    <h1>Welcome to my blog</h1>
    <h2>Posts list</h2>
    <pre>{{ data }}</pre>
  </div>
</template>
