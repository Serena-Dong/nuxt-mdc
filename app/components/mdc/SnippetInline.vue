<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const SNIPPET_INJECTION_KEY = 'snippet-inline-parent-nodes'
const parentSnippets = inject<Set<string>>(SNIPPET_INJECTION_KEY, new Set())

// OLD CODE - Not ideal because the logic is performed both on server and on client, being a cause for possible mismatches
// const isRecursiveSnippet = parentSnippets.has(props.name)

// if (isRecursiveSnippet) {
//   console.log(
//     `Snippet inline "${props.name}" is repeating and will not be fetched again.`
//   )
// } else {
//   provide(SNIPPET_INJECTION_KEY, new Set([...parentSnippets, props.name]))
// }

// const { data: snippetContent } = isRecursiveSnippet
//   ? { data: ref(null) }
//   : await useFetch(`/api/snippets/${props.name}`, {
//       method: 'GET',
//       query: {
//         inline: true,
//       },
//     })

// ALTERNATIVE 1 - useFetch + transform
// The only issue is that, this will perform the fetch even if the snippet is recursive
// const { data: snippetContent } = await useFetch(`/api/snippets/${props.name}`, {
//   method: 'GET',
//   query: {
//     inline: true,
//   },
//   transform: data => {
//     return isRecursiveSnippet ? null : data
//   },
// })

// ALTERNATIVE 2 - useAsyncData + $fetch
// This is the most flexible option, but it requires a bit more code and providing a unique key for every snippet instance,
// to make sure that cached data is not reused for all snippets
const { data: snippetContent } = await useAsyncData(
  `snippet-inline-${props.name}`,
  async () => {
    const isRecursiveSnippet = parentSnippets.has(props.name)
    if (isRecursiveSnippet) {
      console.log(
        `Snippet "${props.name}" is repeating and will not be fetched again.`
      )
    } else {
      provide(SNIPPET_INJECTION_KEY, new Set([...parentSnippets, props.name]))
    }

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
