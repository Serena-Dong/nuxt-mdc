<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const SNIPPET_INJECTION_KEY = "snippet-inline-parent-nodes";
const parentSnippets = inject<Set<string>>(SNIPPET_INJECTION_KEY, new Set());
const isRecursiveSnippet = parentSnippets.has(props.name);

isRecursiveSnippet
  ? console.log(
      `Snippet inline "${props.name}" is repeating and will not be fetched again.`
    )
  : provide(SNIPPET_INJECTION_KEY, new Set([...parentSnippets, props.name]));

const { data: snippetContent } = isRecursiveSnippet
  ? { data: ref(null) }
  : await useFetch(`/api/getSnippet/${props.name}`, {
      method: "GET",
      query: {
        inline: true,
      },
    });
// /api/getSnippet/banana?inline=true
</script>
<template>
  <Suspense suspensible>
    <MDC
      v-if="snippetContent"
      class="markdown-content snippet-inline"
      :value="snippetContent"
      unwrap="p"
      tag="span"
    />
  </Suspense>
</template>
