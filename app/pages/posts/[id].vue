<script setup lang="ts">
const route = useRoute();
const { data: articleContent } = await useFetch(
  `/api/getMarkdown/${route.params.id}`,
  { method: "GET" }
);
</script>
<template>
  <div class="min-h-full">
    <MDC
      v-if="articleContent"
      class="min-h-full"
      tag="article"
      :value="articleContent"
    />
    <div v-else>No content</div>
  </div>
</template>
