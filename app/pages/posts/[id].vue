<script setup lang="ts">
const route = useRoute()
const { data: articleContent } = await useFetch(
  `/api/posts/${route.params.id}`,
  { method: 'GET' }
)

const title = route.params.id
const cleanTitle = typeof title === 'string' ? title.replace(/-/g, ' ') : ''

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
    <div class="content-header">
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
    <div class="content-main">
      <div class="flex flex-col gap-4">
        <h1 class="uppercase">{{ cleanTitle }}</h1>
        <MDC
          v-if="articleContent?.content"
          class="markdown-content mx-auto min-h-full max-w-200"
          tag="article"
          :value="preprocessMd(articleContent?.content)"
        />
        <div v-else>No content</div>
      </div>
    </div>
  </div>
</template>
