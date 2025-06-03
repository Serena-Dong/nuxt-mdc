<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const SNIPPET_INJECTION_KEY = 'snippet-inline-parent-nodes'

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
  `snippet-inline-${props.name}`,
  async () => {
    return isRecursiveSnippet
      ? null
      : ((await $fetch(`/api/snippets/${props.name}`, {
          method: 'GET',
          query: {
            inline: true,
          },
        })) ?? null)
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
