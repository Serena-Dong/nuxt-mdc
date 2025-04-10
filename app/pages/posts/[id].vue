<script setup lang="ts">
const route = useRoute();
const { data: articleContent } = await useFetch(
  `/api/getMarkdown/${route.params.id}`,
  { method: "GET" }
);
</script>
<template>
  <MDC v-if="articleContent" tag="article" :value="articleContent" />
  <div v-else>No content</div>
</template>
