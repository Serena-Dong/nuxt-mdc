<script setup lang="ts">
import type { DBSnippet } from '~~/modules/initLowDB'

const props = defineProps<{
  name: string
}>()

const SNIPPET_INJECTION_KEY = 'snippet-inline-parent-nodes'
const parentSnippets = inject<Set<string>>(SNIPPET_INJECTION_KEY, new Set())
const isRecursiveSnippet = parentSnippets.has(props.name)

if (isRecursiveSnippet) {
  console.log(
    `Snippet inline "${props.name}" is repeating and will not be fetched again.`
  )
} else {
  provide(SNIPPET_INJECTION_KEY, new Set([...parentSnippets, props.name]))
}

const { data: snippetContent } = await useAsyncData<DBSnippet | null>(
  async () => {
    if (isRecursiveSnippet) {
      return null
    } else
      return await $fetch(`/api/snippets/${props.name}`, {
        method: 'GET',
        query: {
          inline: true,
        },
      })
  }
)
</script>
<template>
  <Suspense suspensible>
    <MDC
      v-if="snippetContent?.content"
      class="markdown-content snippet-inline"
      :value="snippetContent.content"
      unwrap="p"
      tag="span"
    />
  </Suspense>
</template>
