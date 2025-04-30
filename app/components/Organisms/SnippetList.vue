<script setup lang="ts">
import type { DBSnippet } from "~~/modules/initLowDB";

defineProps<{
  snippets: DBSnippet[];
  inlineSnippets: DBSnippet[];
}>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <h2 class="mt-8">Snippet List</h2>
    <template v-if="snippets?.length">
      <h3 class="mt-4">Block snippets</h3>
      <div
        v-for="snippet in snippets"
        :key="snippet.id"
        class="flex flex-col gap-3 justify-between border-b-2 border-gray-400 py-2"
      >
        <details>
          <summary class="cursor-pointer font-bold">
            {{ snippet.name }}
          </summary>
          <div
            class="text-gray-400 bg-gray-100 p-4 rounded-md pointer-events-none border-2 border-gray-300"
          >
            <MDC
              tag="p"
              class="markdown-content p-4"
              :value="snippet.content"
            />
          </div>
        </details>
      </div>
    </template>
    <template v-if="inlineSnippets?.length">
      <h3 class="mt-4">Inline snippets</h3>
      <div
        v-for="inlineSnippet in inlineSnippets"
        :key="inlineSnippet.id"
        class="flex justify-between border-b-2 border-gray-400 py-2"
      >
        <p class="text-bold">{{ inlineSnippet.name }}</p>
        <div class="pointer-events-none text-gray-400">
          <MDC
            tag="p"
            class="markdown-content"
            :value="inlineSnippet.content"
          />
        </div>
      </div>
    </template>
    <div
      v-if="!inlineSnippets?.length && !snippets?.length"
      class="py-5 text-center"
    >
      <p class="text-gray-500">
        No snippets available at the moment. Write more!
      </p>
    </div>
  </div>
</template>

<style scoped></style>
