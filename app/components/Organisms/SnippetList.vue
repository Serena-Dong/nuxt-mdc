<script setup lang="ts">
import type { DBSnippet } from "~~/modules/initLowDB";

const { data: snippets, refresh: refreshSnippetList } = await useFetch(
  "/api/snippets",
  {
    method: "GET",
  }
);

defineProps<{
  snippets: DBSnippet[] | undefined;
  inlineSnippets: DBSnippet[] | undefined;
}>();

const snippetToDelete = ref<string | null>(null);

const deleteSnippet = async (snippetName: string) => {
  snippetToDelete.value = snippetName;
  try {
    const response = await $fetch(`/api/snippets/${snippetToDelete.value}`, {
      method: "DELETE",
    });
    console.log("Snippet deleted successfully:", response);
    refreshSnippetList();
  } catch (error) {
    console.error("Error deleting snippet:", error);
  }
};
</script>
<template>
  <div class="flex flex-col gap-3">
    <template v-if="snippets?.length">
      <div
        v-for="snippet in snippets"
        :key="snippet.name"
        class="flex flex-col gap-3 justify-between border-b-2 border-gray-400 py-2"
      >
        <details>
          <summary
            class="cursor-pointer font-bold flex justify-between items-center"
          >
            <div class="name">{{ snippet.name }}</div>
            <button
              @click="deleteSnippet(snippet.name)"
              class="text-sm text-right items-center gap-2 cursor-pointer hover:underline"
            >
              Remove
            </button>
          </summary>

          <div
            class="text-gray-400 bg-gray-100 p-4 rounded-md pointer-events-none border-2 border-gray-300"
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
        class="flex justify-between border-b-2 border-gray-400 py-2 gap-2"
      >
        <p class="text-bold">{{ inlineSnippet.name }}</p>
        <div class="pointer-events-none text-gray-400">
          <p class="markdown-content">
            <SnippetInline
              class="markdown-content"
              :name="inlineSnippet.name"
            />
          </p>
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
