<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const { data: snippetContent } = await useFetch(
  `/api/getSnippet/${props.name}`,
  {
    method: "GET",
  }
);
</script>
<template>
  <Suspense suspensible>
    <div class="snippet">
      <MDC v-if="snippetContent" :value="snippetContent" />
    </div>
  </Suspense>
</template>
