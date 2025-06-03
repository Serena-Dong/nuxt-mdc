<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const SNIPPET_INJECTION_KEY = 'snippet-parent-nodes'

const parentNodes = inject<Set<string>>(
  SNIPPET_INJECTION_KEY,
  new Set<string>()
)
const isRecursiveSnippet = !!parentNodes?.has(props.name)

if (isRecursiveSnippet) {
  console.log(
    `Snippet "${props.name}" is repeating and will not be fetched again.`
  )
} else {
  provide(SNIPPET_INJECTION_KEY, new Set([...parentNodes, props.name]))
}

const { data: snippetContent } = await useAsyncData(
  `snippet-${props.name}`,
  async () => {
    return isRecursiveSnippet
      ? null
      : ((await $fetch(`/api/snippets/${props.name}`, {
          method: 'GET',
        })) ?? null)
  }
)
</script>
<template>
  <Suspense suspensible>
    <div v-if="!isRecursiveSnippet && snippetContent?.content" class="snippet">
      <MDC class="markdown-content" :value="snippetContent.content" />
    </div>
  </Suspense>
</template>
