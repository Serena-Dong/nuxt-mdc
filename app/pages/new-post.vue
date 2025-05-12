<script setup lang="ts">
import type { NewSnippetFormValues } from '~/components/Organisms/NewSnippetForm.props'
import type { NewPostFormValues } from '~/components/Organisms/NewPostForm.props'
//SNIPPET LIST
const { data: snippets } = await useFetch('/api/snippets')
const { data: inlineSnippets } = await useFetch('/api/snippets?inline=true')

// NEW POST FORM
const newPostData = ref<NewPostFormValues>({
  title: '',
  slug: '',
  content: '',
})
// New Snippet Form
const newSnippetForm = ref<NewSnippetFormValues>({
  name: '',
  inline: false,
  content: '',
})

// const feedbackPopup = ref<PopupProps>({
//   status: "",
//   content: "",
// });
// const showPopup = ref(false);

const writeNewPost = async (submitPayload: NewPostFormValues) => {
  newPostData.value = { ...submitPayload }
  console.log('New post data:', newPostData.value)

  await $fetch('/api/posts', {
    method: 'POST',
    body: {
      title: newPostData.value.title,
      slug: newPostData.value.slug,
      content: newPostData.value.content,
    },
  })
    .then(response => {
      console.log('Post created successfully:', response)
      //   showPopup.value = true;
      //   feedbackPopup.value = {
      //     status: "success",
      //     content: "Post created successfully!",
      //   };
      navigateTo('/')
    })
    .catch(error => {
      console.error('Error creating post:', error)
      //   showPopup.value = true;
      //   feedbackPopup.value = {
      //     status: "error",
      //     content: "Error creating post. Please try again.",
      //   };
    })
}

// Sidebar Function
const showSnippetList = ref(false)
const showCreateSnippet = ref(false)

const toggleSnippetList = () => {
  showSnippetList.value = !showSnippetList.value
}
const toggleCreateSnippet = () => {
  showCreateSnippet.value = !showCreateSnippet.value
}
</script>

<template>
  <div class="min-h-full p-4 pt-0 md:p-8 md:!pt-0">
    <!-- Main content area -->
    <section id="new-post-form" class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h2 class="text-lg uppercase md:text-2xl">Create a new post</h2>
        <button
          class="cursor-pointer self-end bg-black px-4 py-2 text-sm text-white uppercase hover:bg-gray-800"
          @click="toggleSnippetList"
        >
          Snippet List
        </button>
      </div>
      <OrganismsNewPostForm
        :new-post-form="newPostData"
        @submit="writeNewPost"
      />
    </section>

    <!-- Snippet list side page -->
    <div v-if="showSnippetList" class="side-page w-full md:w-1/2">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="uppercase">Snippet List</h2>
        <div class="action-buttons flex gap-2">
          <button
            class="cursor-pointer self-end bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            @click="toggleCreateSnippet"
          >
            <span class="md:hidden">Add </span>
            <span class="hidden md:block">Add a Snippet</span>
          </button>
          <button
            class="cursor-pointer self-end bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            @click="toggleSnippetList"
          >
            Close
          </button>
        </div>
      </div>

      <OrganismsSnippetList
        class="h-full overflow-y-auto"
        :snippets="snippets"
        :inline-snippets="inlineSnippets"
      />
    </div>
    <div v-if="showCreateSnippet" class="side-page w-full md:w-1/2">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="uppercase">Add a Snippet</h2>
        <div class="action-buttons flex gap-2">
          <button
            class="cursor-pointer self-end bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            @click="toggleCreateSnippet"
          >
            Go back
          </button>
        </div>
      </div>

      <OrganismsNewSnippetForm
        class="h-full overflow-y-auto"
        :new-snippet-form="newSnippetForm"
      />
    </div>
  </div>
</template>
<style scoped>
.side-page {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #fff;
  z-index: 1000;
  padding: 20px;
}
</style>
