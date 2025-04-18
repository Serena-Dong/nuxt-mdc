<script setup lang="ts">
const route = useRoute();
const { data: articleContent } = await useFetch(
  `/api/getMarkdown/${route.params.id}`,
  { method: "GET" }
);
</script>
<template>
  <div
    class="min-h-full h-0 p-4 md:p-8 md:pb-4 md:px-1/10 lg:px-1/7 xl:px-1/4 bg-amber-200"
  >
    <MDC
      v-if="articleContent"
      class="min-h-full mx-auto max-w-200 bg-white"
      tag="article"
      :value="articleContent"
    />
    <div v-else>No content</div>
  </div>
</template>
