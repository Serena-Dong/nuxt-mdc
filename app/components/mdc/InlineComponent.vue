<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const SNIPPET_INJECTION_KEY = "snippet-parent-nodes";
const parentSnippets = inject<Set<string>>(SNIPPET_INJECTION_KEY, new Set());
const isRecursiveSnippet = parentSnippets.has(props.name);

isRecursiveSnippet
  ? console.log(
      `Snippet "${props.name}" is repeating and will not be fetched again.`
    )
  : provide(SNIPPET_INJECTION_KEY, new Set([...parentSnippets, props.name]));

const { data: snippetContent } = isRecursiveSnippet
  ? { data: ref(null) }
  : await useFetch(`/api/getSnippet/${props.name}`, { method: "GET" });
</script>
<template>
  <Suspense suspensible>
    <span v-if="snippetContent" class="snippet-inline">ciao</span>
  </Suspense>
</template>
