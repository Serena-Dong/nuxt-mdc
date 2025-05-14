<script setup lang="ts">
import type { DBSnippet } from '~~/modules/initLowDB'

defineProps<{
  snippets: DBSnippet[] | undefined
  inlineSnippets: DBSnippet[] | undefined
}>()

defineEmits<{
  (e: 'delete-snippet', snippetName: string, snippetInline: boolean): void
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <template v-if="snippets?.length">
      <h3 class="mt-4">Snippets</h3>
      <div
        v-for="snippet in snippets"
        :key="snippet.name"
        class="flex flex-col justify-between gap-3 border-b-2 border-gray-400 py-2"
      >
        <details>
          <summary
            class="flex cursor-pointer items-center justify-between font-bold"
          >
            <div class="name">{{ snippet.name }}</div>
            <button
              @click="$emit('delete-snippet', snippet.name, false)"
              class="cursor-pointer items-center gap-2 text-right text-sm hover:underline"
            >
              Remove
            </button>
          </summary>
          <div
            class="pointer-events-none rounded-md border-2 border-gray-300 bg-gray-100 p-4 text-gray-400"
          >
            <p class="markdown-content-p-4">
              <Snippet :name="snippet.name" />
            </p>
          </div>
        </details>
      </div>
    </template>

    <template v-if="inlineSnippets?.length">
      <h3 class="mt-4">Inline snippets</h3>
      <div
        v-for="inlineSnippet in inlineSnippets"
        :key="inlineSnippet.name"
        class="flex flex-col justify-between gap-3 border-b-2 border-gray-400 py-2"
      >
        <details>
          <summary
            class="flex cursor-pointer items-center justify-between font-bold"
          >
            <div class="name">{{ inlineSnippet.name }}</div>
            <button
              class="cursor-pointer items-center gap-2 text-right text-sm hover:underline"
              @click="$emit('delete-snippet', inlineSnippet.name, true)"
            >
              Remove
            </button>
          </summary>
          <div
            class="pointer-events-none rounded-md border-2 border-gray-300 bg-gray-100 p-4 text-gray-400"
          >
            <p class="markdown-content-p-4">
              <SnippetInline :name="inlineSnippet.name" />
            </p>
          </div>
        </details>
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
