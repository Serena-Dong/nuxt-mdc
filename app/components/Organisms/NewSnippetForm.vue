<script setup lang="ts">
import type { NewSnippetFormValues } from '~/components/Organisms/NewSnippetForm.props'

const emit = defineEmits<{
  (e: 'submit', formValues: NewSnippetFormValues): void
}>()

const formValues = defineModel<NewSnippetFormValues>('newSnippetForm', {
  required: true,
})
const submitCleanup = (formBody: NewSnippetFormValues) => {
  if (!formBody.name?.length || !formBody.content?.length) {
    alert('Missing snippet name or content')
    return
  }

  const validatedFormBody: NewSnippetFormValues = {
    name: formBody.name.trim(),
    content: formBody.content.trim(),
    inline: !!formBody.inline,
  }

  emit('submit', validatedFormBody)
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submitCleanup(formValues)">
    <div class="flex items-center justify-between gap-6">
      <div class="name flex-2/3">
        <label for="new-snippet__name" class="text-lg font-semibold"
          >Name</label
        >

        <input
          id="new-snippet__name"
          type="text"
          placeholder="Name"
          v-model="formValues.name"
          class="w-full rounded border border-gray-300 p-2"
        />
      </div>
      <div class="flex flex-1/3 flex-col items-center justify-center gap-3">
        <label for="new-snippet__inline" class="text-lg font-semibold"
          >Inline</label
        >
        <USwitch default-value v-model="formValues.inline" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="col-span-1">
        <label for="new-snippet__content" class="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="new-snippet__content"
          placeholder="Write your post content in markdown"
          v-model="formValues.content"
          class="mb-4 h-40 w-full overflow-y-scroll rounded border border-gray-300 p-2 align-text-top whitespace-pre-wrap"
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
          class="mb-4 h-40 w-full overflow-y-scroll rounded border border-gray-300 p-2"
        >
          <MDC
            v-if="formValues.content?.length"
            :key="formValues.content"
            class="markdown-content pointer-events-none"
            :value="formValues.content"
          />
          <p v-else class="text-gray-500 italic">No content to display</p>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="cursor-pointer self-end bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      Save
    </button>
  </form>
</template>
