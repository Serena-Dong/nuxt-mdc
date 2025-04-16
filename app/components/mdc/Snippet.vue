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
  <div class="snippet">
    <MDC v-if="snippetContent" :value="snippetContent" />
    <div class="title"><MDCSlot name="title" mdc-unwrap="h1" /></div>
    <div class="text"><MDCSlot name="text" mdc-unwrap="p" /></div>
  </div>
</template>
