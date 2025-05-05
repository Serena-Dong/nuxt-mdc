<script setup lang="ts">
import type { PopupProps } from "~/components/Molecules/Popup.props";
import type { FormValues } from "~/components/Organisms/NewPostForm/NewPostForm.props";

//SNIPPET LIST
const { data: snippets } = await useFetch("/api/snippets");
const { data: inlineSnippets } = await useFetch("/api/snippets?inline=true");

// NEW POST FORM
const newPostData = ref<FormValues>({
  title: "",
  slug: "",
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
</script>

<template>
  <div class="min-h-full p-4 pt-0 md:p-8 md:!pt-0">
    <section id="new-post-form" class="flex flex-col gap-3">
      <h2>Crea un nuovo post</h2>
      <OrganismsNewPostForm
        :new-post-form="newPostData"
        @submit="writeNewPost"
      />
    </section>
    <section id="new-snippet-form" class="inline"></section>
    <section id="snippet-list">
      <OrganismsSnippetList
        :snippets="snippets"
        :inline-snippets="inlineSnippets"
      />
    </section>
  </div>
</template>
