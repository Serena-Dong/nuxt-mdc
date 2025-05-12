<script setup lang="ts">
const route = useRoute();
</script>
<template>
  <header>
    <div class="p-4 md:px-8">
      <div
        class="flex justify-between items-center border-b-2 border-gray-400 pb-2"
      >
        <a
          href="#main-content"
          class="box-border fixed z-50 top-0 bg-sky-700 border-2 border-white rounded-b-md text-white text-sm font-medium px-4 py-2 pb-4 -translate-y-full focus:translate-y-0 transition-transform block"
        >
          Skip to content
        </a>
        <a href="/">
          <h1 class="uppercase">Nuxt-mdc</h1>
        </a>

        <ul class="flex text-gray-500 gap-2">
          <li class="list-none">
            <NuxtLink
              class="flex items-center gap-2"
              to="https://nuxt.com/modules/mdc"
              target="_blank"
            >
              <span>Documentation</span>
              <icon name="line-md:external-link"></icon>
            </NuxtLink>
          </li>
          <li class="list-none" v-if="route.path !== '/new-post'">
            <NuxtLink class="flex items-center gap-2" to="/new-post">
              <span>Create</span>
              <icon name="line-md:file-document-plus"></icon>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
