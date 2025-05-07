<script setup lang="ts">
import type { FormValues } from "./FormValues";

// Todo: add function to be implemented
const emit = defineEmits<{
  (e: "submit", formValues: FormValues): void;
}>();
const formValues = defineModel<FormValues>("newPostForm", {
  required: true,
});

const submitCleanup = (formBody: FormValues) => {
  if (!(formBody.name?.length ?? 0) || !(formBody.content?.length ?? 0)) {
    return;
  }

  const validatedFormBody: FormValues = {
    name: (formBody.name ?? "").trim(),
    content: (formBody.content ?? "").trim(),
    inline: formBody.inline,
  };

  emit("submit", validatedFormBody);
};

const parseMarkdownForPreview = (content: string) => {};
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submitCleanup(formValues)">
    <div class="flex items-center gap-6 justify-between">
      <div class="name flex-2/3">
        <label for="new-snippet__name" class="text-lg font-semibold"
          >Title</label
        >
        <input
          id="new-snippet__name"
          type="text"
          placeholder="Name"
          class="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div class="flex-1/3 gap-3 flex flex-col items-center justify-center">
        <label for="new-snippet__inline" class="text-lg font-semibold"
          >Inline</label
        >
        <USwitch default-value />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="col-span-1">
        <label for="new-snippet__content" class="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="new-snippet__content"
          placeholder="Write your post content in markdown"
          class="border border-gray-300 rounded p-2 mb-4 w-full h-40 overflow-y-scroll align-text-top whitespace-pre-wrap"
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <label
          for="new-snippet__content__preview"
          class="text-lg font-semibold"
        >
          Preview
        </label>
        <div
          id="new-snippet__content__preview"
          readonly
          class="border border-gray-300 rounded p-2 mb-4 w-full h-40 overflow-y-scroll"
        >
          <MDC class="markdown-content pointer-events-none" :value="''" />
          <p class="text-gray-500 italic">Nessun contenuto da visualizzare</p>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="bg-black text-white cursor-pointer self-end py-2 px-4 hover:bg-gray-800"
    >
      Create Snippet
    </button>
  </form>
</template>
