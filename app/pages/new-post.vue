<script setup lang="ts">
import type { NewSnippetFormValues } from "~/components/Organisms/NewSnippetForm.props";
import type { NewPostFormValues } from "~/components/Organisms/NewPostForm.props";

//SNIPPET LIST
const { data: snippets, refresh: refreshSnippetList } =
  await useFetch("/api/snippets");
const { data: inlineSnippets, refresh: refreshInlineSnippetList } =
  await useFetch("/api/snippets?inline=true");

// NEW POST FORM
const newPostData = ref<NewPostFormValues>({
  title: "",
  slug: "",
  content: "",
});
// New Snippet Form
const newSnippetData = ref<NewSnippetFormValues>({
  name: "",
  inline: false,
  content: "",
});
const writeNewPost = async (submitPayload: NewPostFormValues) => {
  newPostData.value = { ...submitPayload };
  console.log("New post data:", newPostData.value);

  try {
    const response = await $fetch("/api/posts", {
      method: "POST",
      body: {
        title: newPostData.value.title,
        slug: newPostData.value.slug,
        content: newPostData.value.content,
      },
    });
    console.log("Post created successfully:", response);
    navigateTo("/");
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const writeNewSnippet = async (submitPayload: NewSnippetFormValues) => {
  newSnippetData.value = { ...submitPayload };
  console.log("New snippet data:", newSnippetData.value);

  const fetchURL = newSnippetData.value.inline
    ? "/api/snippets?inline=true"
    : "/api/snippets";

  try {
    const response = await $fetch(fetchURL, {
      method: "POST",
      body: {
        name: newSnippetData.value.name,
        content: newSnippetData.value.content,
      },
    });
    console.log("Snippet created successfully:", response);
    window.location.reload();
  } catch (error) {
    console.error("Error creating snippet:", error);
  }
};

const snippetToDelete = ref<string | null>(null);

const deleteSnippet = async (snippetName: string, snippetInline: boolean) => {
  snippetToDelete.value = snippetName;
  try {
    const url = `/api/snippets/${snippetToDelete.value}${
      snippetInline ? "?inline=true" : ""
    }`;

    const response = await $fetch(url, {
      method: "DELETE",
    });
    console.log("Snippet deleted successfully:", response);

    if (snippetInline) {
      refreshInlineSnippetList();
    } else {
      refreshSnippetList();
    }
  } catch (error) {
    console.error("Error deleting snippet:", error);
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
        :new-post-form="newPostData"
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
      :deleteSnippet="deleteSnippet"
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

    <OrganismsNewSnippetForm
      class="overflow-y-auto h-full"
      :new-snippet-form="newSnippetData"
      @submit="writeNewSnippet"
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
