<script setup lang="ts">
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

const { data: ast } = await useAsyncData("markdown", () =>
  parseMarkdown("::alert\nMissing markdown input\n::")
);
</script>

<template>
  <MDCRenderer :body="ast.body" :data="ast.data" />
</template>
