<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const SNIPPET_INJECTION_KEY = "snippet-parent-nodes";
const parentSnippets = inject<Set<string>>(SNIPPET_INJECTION_KEY, new Set());
const isRepeating = parentSnippets.has(props.name);
if (!isRepeating) {
  provide(SNIPPET_INJECTION_KEY, new Set([...parentSnippets, props.name]));
}

const { data: snippetContent } = isRepeating
  ? { data: ref(null) }
  : await useFetch(`/api/getSnippet/${props.name}`, { method: "GET" });
</script>
<template>
  <Suspense suspensible>
    <div v-if="snippetContent" class="snippet">
      <MDC :value="snippetContent" />
    </div>
  </Suspense>
</template>
