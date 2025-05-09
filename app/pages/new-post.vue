<script setup lang="ts">
import type { FormValues } from "~/components/Organisms/FormValues";
import { ref } from "vue";

// Snippet List
const { data: snippets } = await useFetch("/api/snippets");
const { data: inlineSnippets } = await useFetch("/api/snippets?inline=true");

// Forms
const newPostFormData = ref<FormValues>({
  title: "",
  slug: "",
  content: "",
});
const newSnippetFormData = ref<FormValues>({
  name: "",
  inline: false,
  content: "",
});

const writeNewPost = async (submitPayload: FormValues) => {
  newPostFormData.value = { ...submitPayload };
  console.log("New post data:", newPostFormData.value);

  try {
    const response = await $fetch("/api/posts", {
      method: "POST",
      body: {
        title: newPostFormData.value.title,
        slug: newPostFormData.value.slug,
        content: newPostFormData.value.content,
      },
    });
    console.log("Post created successfully:", response);
    navigateTo("/");
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const writeNewSnippet = async (submitPayload: FormValues) => {
  newSnippetFormData.value = { ...submitPayload };
  console.log("New snippet data:", newSnippetFormData.value);

  try {
    const response = await $fetch("/api/snippets", {
      method: "POST",
      body: {
        name: newSnippetFormData.value.name,
        inline: newSnippetFormData.value.inline,
        content: newSnippetFormData.value.content,
      },
    });
    console.log("Snippet created successfully:", response);
    window.location.reload();
  } catch (error) {
    console.error("Error creating snippet:", error);
  }
};

// Sidebar Function
const showSnippetSidebar = ref(false);
const showCreateSnippet = ref(false);

const toggleSnippetList = () => {
  showSnippetSidebar.value = !showSnippetSidebar.value;
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
        :new-post-form="newPostFormData"
        @submit="writeNewPost"
      />
    </section>
  </div>

  <!-- Snippet list side page -->
  <div v-if="showSnippetSidebar" class="side-page w-full md:w-1/2">
    <div class="flex justify-between items-center mb-6">
      <h2 class="uppercase">
        {{ !showCreateSnippet ? "Snipper List" : "Add Snippet" }}
      </h2>

      <div class="action-buttons flex gap-2">
        <button
          class="bg-black text-white cursor-pointer text-sm self-end py-2 px-4 hover:bg-gray-800"
          @click="toggleCreateSnippet"
        >
          <span class="md:hidden">{{
            !showCreateSnippet ? "Add" : "Go back"
          }}</span>
          <span class="hidden md:block">{{
            !showCreateSnippet ? "Add a Snippet" : "Go back"
          }}</span>
        </button>
        <button
          v-if="!showCreateSnippet"
          class="bg-black text-white cursor-pointer text-sm self-end py-2 px-4 hover:bg-gray-800"
          @click="toggleSnippetList"
        >
          Close
        </button>
      </div>
    </div>

    <OrganismsSnippetList
      v-if="!showCreateSnippet"
      class="overflow-y-auto h-full"
      :snippets="snippets"
      :inline-snippets="inlineSnippets"
    />
    <OrganismsNewSnippetForm
      v-else
      :new-snippet-form="newSnippetFormData"
      @submit="writeNewSnippet"
      class="overflow-y-auto h-full"
    />
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
