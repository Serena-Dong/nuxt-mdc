<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <header>
    <div class="p-4 md:px-8">
      <div
        class="flex items-center justify-between border-b-2 border-gray-400 pb-2"
      >
        <a
          href="#main-content"
          class="fixed top-0 z-50 box-border block -translate-y-full rounded-b-md border-2 border-white bg-sky-700 px-4 py-2 pb-4 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <NuxtLink to="/">
          <h1 class="uppercase">Nuxt-mdc</h1>
        </NuxtLink>

        <ul class="flex gap-2 text-gray-500">
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
