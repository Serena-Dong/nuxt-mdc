<script setup lang="ts">
const route = useRoute()

// Article Data Call
const { data: articleContent } = await useFetch(
  `/api/posts/${route.params.id}`,
  {
    method: 'GET',
  }
)
// Article Title
const articleTitle = computed(() => {
  return articleContent.value?.postInfo?.title
})

const preprocessMd = (content: string) => {
  return content?.replace(
    /(?<!\\)(?<!`)(?:```[\s\S]*?```|`[^`]*`|__(.*?)__)/g,
    (match, word) => {
      if (match.startsWith('`') || match.startsWith('```')) {
        return match // Ignore content inside backticks
      }
      return word ? `<u>${word}</u>` : match
    }
  )
}
</script>
<template>
  <div class="flex min-h-full flex-col gap-4 p-4 pt-0 md:p-8 md:pt-0">
    <!-- Article Header -->
    <div class="article-header">
      <div class="flex items-center justify-between">
        <div class="go-back">
          <NuxtLink to="/" class="flex items-center gap-2 uppercase">
            <icon name="line-md:arrow-left"></icon>
            <span class="font-medium">Go back</span></NuxtLink
          >
        </div>
        <div class="page-name">
          <h1 class="!text-xl uppercase">Minimal Blog</h1>
        </div>
      </div>
    </div>

    <!-- Article Main / Data -->
    <div class="article-main article-content md:px-26 md:py-6">
      <div class="flex flex-col gap-8">
        <!-- Article Title -->
        <h1 class="uppercase">
          {{ articleTitle }}
        </h1>
        <!-- Article Content -->
        <MDC
          v-if="articleContent?.content"
          class="markdown-content min-h-full"
          tag="article"
          :value="preprocessMd(articleContent?.content)"
        />
        <div v-else>No content</div>
      </div>
    </div>
  </div>
</template>
