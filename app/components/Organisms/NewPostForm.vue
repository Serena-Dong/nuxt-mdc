<script setup lang="ts">
import type { NewPostFormValues } from "./NewPostForm.props";

const emit = defineEmits<{
  (e: "submit", formValues: NewPostFormValues): void;
}>();
const formValues = defineModel<NewPostFormValues>("newPostForm", {
  required: true,
});

// Placeholder is visible only when the title is empty, otherwise it shows the title in kebab case
const slugPlaceholderValue = computed(() =>
  formValues.value.title?.length
    ? kebabify(formValues.value.title)
    : "Inserisci uno slug univoco per il tuo post"
);

const submitCleanup = (formBody: NewPostFormValues) => {
  if (!formBody.title?.length || !formBody.content?.length) {
    alert("Missing post title or content");
    return;
  }

  const validatedFormBody = {
    title: formBody.title?.trim(),
    content: formBody.content?.trim(),
    slug: formBody.slug?.length ? formBody.slug : kebabify(formBody.title),
  };

  emit("submit", validatedFormBody);
};

const addNewLineOnEnter = (e: KeyboardEvent) => {
  const target = e.target as HTMLTextAreaElement;

  let cursorPosition = target.selectionEnd;

  target.value =
    target.value.substring(0, cursorPosition) +
    "\n" +
    target.value.substring(cursorPosition);

  target.selectionEnd = cursorPosition + 1;
};
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="submitCleanup(formValues)">
    <div class="flex gap-3">
      <div class="title flex-1/2">
        <label for="new-post__title" class="text-lg font-semibold">Title</label>
        <input
          id="new-post__title"
          type="text"
          v-model="formValues.title"
          placeholder="Title"
          class="border border-gray-300 rounded p-2 mb-4 w-full"
        />
      </div>
      <div class="slug flex-1/2">
        <label for="new-post__slug" class="text-lg font-semibold">
          Slug
          <span class="text-xs">(kebab case)</span>
        </label>
        <input
          id="new-post__slug"
          type="text"
          v-model="formValues.slug"
          :placeholder="slugPlaceholderValue"
          class="border border-gray-300 rounded p-2 mb-4 w-full"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="col-span-1">
        <label for="new-post__content" class="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="new-post__content"
          v-model="formValues.content"
          placeholder="Write your post content in markdown"
          class="border border-gray-300 rounded p-2 mb-4 w-full h-40 overflow-y-scroll align-text-top whitespace-pre-wrap"
          @keydown.enter.prevent="addNewLineOnEnter"
        />
        <div class="text-xs flex flex-col gap-3">
          <p>
            <i>
              <b>Tip:</b> You can use the following shortcuts to insert snippets
              and components:
            </i>
          </p>
          <ul class="list-disc pl-4 text-gray-500">
            <li>
              <b>Inline:</b>
              <span class="block">
                :snippet-inline{name='nome_dello_snippet'}
              </span>
            </li>
            <li>
              <b>Block:</b>
              <span class="block">
                ::snippet{name='nome_dello_snippet'}<br />
                ::
              </span>
            </li>
            <li c>
              <b>CustomComponent:</b>
              <span class="block">
                ::component-name-in-kebab-case<br />
                ::
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-1 flex flex-col">
        <label for="new-post__content__preview" class="text-lg font-semibold">
          Preview
        </label>
        <div
          id="new-post__content__preview"
          readonly
          class="border border-gray-300 rounded p-2 mb-4 w-full h-40 overflow-y-scroll"
        >
          <MDC
            v-if="(formValues.content ?? '').length"
            :key="formValues.content"
            class="markdown-content pointer-events-none"
            :value="formValues.content ?? ''"
          />
          <p v-else class="text-gray-500 italic">
            Nessun contenuto da visualizzare
          </p>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="bg-black uppercase text-white cursor-pointer self-end py-2 px-4 hover:bg-gray-800"
    >
      Save
    </button>
  </form>
</template>

<style scoped></style>
