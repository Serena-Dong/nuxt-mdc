<script setup lang="ts">
// import type { PopupProps } from "~/components/Molecules/Popup.props";
import type { FormValues } from "~/components/Organisms/FormValues";
import { ref } from "vue";
//SNIPPET LIST
const { data: snippets } = await useFetch("/api/snippets");
const { data: inlineSnippets } = await useFetch("/api/snippets?inline=true");

// NEW POST FORM
const newPostData = ref<FormValues>({
  title: "",
  slug: "",
  content: "",
});
// New Snippet Form
const newSnippetForm = ref<FormValues>({
  name: "",
  inline: false,
  content: "",
});

// const feedbackPopup = ref<PopupProps>({
//   status: "",
//   content: "",
// });
// const showPopup = ref(false);

const writeNewPost = async (submitPayload: FormValues) => {
  newPostData.value = { ...submitPayload };
  console.log("New post data:", newPostData.value);

  await $fetch("/api/posts", {
    method: "POST",
    body: {
      title: newPostData.value.title,
      slug: newPostData.value.slug,
      content: newPostData.value.content,
    },
  })
    .then((response) => {
      console.log("Post created successfully:", response);
      //   showPopup.value = true;
      //   feedbackPopup.value = {
      //     status: "success",
      //     content: "Post created successfully!",
      //   };
      navigateTo("/");
    })
    .catch((error) => {
      console.error("Error creating post:", error);
      //   showPopup.value = true;
      //   feedbackPopup.value = {
      //     status: "error",
      //     content: "Error creating post. Please try again.",
      //   };
    });
};

// Sidebar Function
const showSnippetList = ref(false);
const showCreateSnippet = ref(false);

const toggleSnippetList = () => {
  showSnippetList.value = !showSnippetList.value;
};
const toggleCreateSnippet = () => {
  showCreateSnippet.value = !showCreateSnippet.value;
};
</script>

<template>
  <div class="min-h-full p-4 pt-0 md:p-8 md:!pt-0">
    <!-- Main content area -->
    <section id="new-post-form" class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h2 class="md:text-2xl text-lg uppercase">Create a new post</h2>
        <button
          class="bg-black text-white cursor-pointer text-sm self-end py-2 px-4 hover:bg-gray-800 uppercase"
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

    <!-- <section id="new-snippet-form" class="inline"></section> -->
  </div>
  <!-- Snippet list side page -->
  <div v-if="showSnippetList" class="side-page w-full md:w-1/2">
    <div class="flex justify-between items-center mb-6">
      <h2 class="uppercase">Snippet List</h2>
      <div class="action-buttons flex gap-2">
        <button
          class="bg-black text-white cursor-pointer text-sm self-end py-2 px-4 hover:bg-gray-800"
          @click="toggleCreateSnippet"
        >
          <span class="md:hidden">Add </span>
          <span class="hidden md:block">Add a Snippet</span>
        </button>
        <button
          class="bg-black text-white cursor-pointer text-sm self-end py-2 px-4 hover:bg-gray-800"
          @click="toggleSnippetList"
        >
          Close
        </button>
      </div>
    </div>

    <OrganismsSnippetList
      class="overflow-y-auto h-full"
      :snippets="snippets"
      :inline-snippets="inlineSnippets"
    />
  </div>
  <div v-if="showCreateSnippet" class="side-page w-full md:w-1/2">
    <div class="flex justify-between items-center mb-6">
      <h2 class="uppercase">Add a Snippet</h2>
      <div class="action-buttons flex gap-2">
        <button
          class="bg-black text-white cursor-pointer text-sm self-end py-2 px-4 hover:bg-gray-800"
          @click="toggleCreateSnippet"
        >
          Go back
        </button>
      </div>
    </div>

    <OrganismsNewSnippetForm class="overflow-y-auto h-full" />
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
