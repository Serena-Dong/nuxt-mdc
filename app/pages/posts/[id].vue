<script setup lang="ts">
const route = useRoute();
const { data: articleContent } = await useFetch(
  `/api/getMarkdown/${route.params.id}`,
  { method: "GET" }
);

const title = route.params.id;
const cleanTitle = typeof title === "string" ? title.replace(/-/g, " ") : "";
</script>
<template>
  <div class="min-h-full p-4 md:p-8 pt-0 md:pt-0 flex flex-col gap-4">
    <div class="content-header">
      <div class="flex justify-between items-center">
        <div class="go-back">
          <NuxtLink to="/" class="flex items-center gap-2 uppercase">
            <icon name="line-md:arrow-left"></icon>
            <h6>Go back</h6></NuxtLink
          >
        </div>
        <div class="page-name">
          <h3 class="uppercase">Minimal Blog</h3>
        </div>
      </div>
    </div>
    <div class="content-main">
      <div class="flex flex-col gap-4">
        <h1 class="uppercase">{{ cleanTitle }}</h1>
        <MDC
          v-if="articleContent"
          class="min-h-full mx-auto max-w-200 markdown-content"
          tag="article"
          :value="articleContent"
        />
        <div v-else>No content</div>
      </div>
    </div>
  </div>
</template>
