<script setup lang="ts">
const route = useRoute();
const { data: articleContent } = await useFetch(
  `/api/posts/${route.params.id}`,
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
            <span class="font-medium">Go back</span></NuxtLink
          >
        </div>
        <div class="page-name">
          <h1 class="uppercase !text-xl">Minimal Blog</h1>
        </div>
      </div>
    </div>
    <div class="content-main">
      <div class="flex flex-col gap-4">
        <h1 class="uppercase">{{ cleanTitle }}</h1>
        <MDC
          v-if="articleContent?.content"
          class="min-h-full mx-auto max-w-200 markdown-content"
          tag="article"
          :value="articleContent.content"
        />
        <div v-else>No content</div>
      </div>
    </div>
  </div>
</template>
