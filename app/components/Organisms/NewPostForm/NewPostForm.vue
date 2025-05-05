<script setup lang="ts">
import type { FormValues } from "./NewPostForm.props";

const emit = defineEmits<{
  (e: "submit", formValues: FormValues): void;
}>();
const formValues = defineModel<FormValues>("newPostForm", {
  required: true,
});

const slugPlaceholderValue = computed(() => {
  const kebabCaseTitle = kebabify(formValues.value.title);

  return formValues.value.title.length
    ? kebabCaseTitle
    : "Inserisci uno slug univoco per il tuo post";
});

const submitCleanup = (formBody: FormValues) => {
  if (!formBody.title.length || !formBody.content.length) {
    return;
  }

  const validatedFormBody = {
    title: formBody.title.trim(),
    content: formBody.content.trim(),
    slug: formBody.slug.length ? formBody.slug : kebabify(formBody.title),
  };

  emit("submit", validatedFormBody);
};

const parseMarkdownForPreview = (content: string) => {};
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="submitCleanup(formValues)">
    <label for="new-post__title" class="text-lg font-semibold">Title</label>
    <input
      id="new-post__title"
      type="text"
      v-model="formValues.title"
      placeholder="Title"
      class="border border-gray-300 rounded p-2 mb-4 w-full"
    />
    <label for="new-post__slug" class="text-lg font-semibold">
      Slug <i>(N.B.: è permesso solo il kebab case)</i>
    </label>
    <input
      id="new-post__slug"
      type="text"
      v-model="formValues.slug"
      :placeholder="slugPlaceholderValue"
      class="border border-gray-300 rounded p-2 mb-4 w-full"
    />
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
          @keydown.enter.prevent="
            (e) => {
              console.log(e);
              e.target.value += '\n';
            }
          "
        />
        <p>
          <i>
            <b>Tip:</b> You can use the following shortcuts to insert snippets
            and conmponents:
          </i>
        </p>
        <ul class="list-disc pl-4">
          <li class="text-sm text-gray-500">
            <b>Inline:</b>
            <span class="block">
              :snippet-inline{name='nome_dello_snippet'}
            </span>
          </li>
          <li class="text-sm text-gray-500">
            <b>Block:</b>
            <span class="block">
              ::snippet{name='nome_dello_snippet'}<br />
              ::
            </span>
          </li>
          <li class="text-sm text-gray-500">
            <b>CustomComponent:</b>
            <span class="block">
              ::component-name-in-kebab-case<br />
              ::
            </span>
          </li>
        </ul>
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
            v-if="formValues.content.length"
            :key="formValues.content"
            class="markdown-content pointer-events-none"
            :value="formValues.content"
          />
          <p v-else class="text-gray-500 italic">
            Nessun contenuto da visualizzare
          </p>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="bg-black text-white cursor-pointer self-end py-2 px-4 hover:bg-gray-800"
    >
      Submit
    </button>
  </form>
</template>

<style scoped></style>
