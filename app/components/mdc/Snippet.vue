<script setup lang="ts">
const props = defineProps({
  name: {
    required: true,
    type: String,
  },
});

const snippets = computed(() => {
  const snippetMap = {
    alert: `# I'm an alert snippet
        - Alert 1
        - Alert 2
    `,
    calendar: `# I'm a calendar snippet`,
  };

  return snippetMap[props.name];
});
</script>
<template>
  <MDC :body="snippets" />
</template>
