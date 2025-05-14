<script setup lang="ts">
const { data: posts, refresh: refreshPostList } = await useFetch('/api/posts', {
  method: 'GET',
})

const confirmDeletePopup = ref(false)

const postToDelete = ref<string | null>(null)

const showConfirmDeletePopup = (slug: string) => {
  if (!slug?.length) return
  confirmDeletePopup.value = true
  postToDelete.value = slug
}

const deletePost = async () => {
  try {
    const response = await $fetch(`/api/posts/${postToDelete.value}`, {
      method: 'DELETE',
    })
    console.log('Post deleted successfully:', response)
    refreshPostList()
  } catch (error) {
    console.error('Error deleting post:', error)
  } finally {
    confirmDeletePopup.value = false
    postToDelete.value = null
  }
}
</script>
<template>
  <div class="relative min-h-full p-4 pt-0 md:p-8 md:!pt-0">
    <div
      v-if="confirmDeletePopup"
      class="confirm-delete-popup absolute top-0 right-0 z-50 flex flex-col gap-4 rounded bg-white p-4 shadow-md"
    >
      <p>Vuoi davvero rimuovere questo post?</p>
      <div class="flex justify-between">
        <button
          id="confirm-button"
          class="bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          @click="deletePost"
        >
          Yes
        </button>
        <button
          id="abort-button"
          class="bg-black px-4 py-2 text-white hover:bg-gray-800"
          @click="
            confirmDeletePopup = false
            postToDelete = null
          "
        >
          No
        </button>
      </div>
    </div>
    <div class="mb-4 flex items-center justify-center md:mb-8">
      <h1 class="text-7xl uppercase md:text-8xl">Minimal Blog</h1>
    </div>
    <div v-if="posts?.length" class="">
      <MoleculesBlogCard
        v-for="post in posts"
        :key="post.postInfo.slug"
        v-bind="post.postInfo"
        @delete-post="showConfirmDeletePopup(post.postInfo.slug)"
      />
    </div>
    <div v-else class="py-5 text-center">
      <p class="text-gray-500">
        No posts available at the moment. Check back later!
      </p>
    </div>
  </div>
</template>
