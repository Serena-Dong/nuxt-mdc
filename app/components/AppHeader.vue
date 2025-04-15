<script setup lang="ts"></script>
<template>
  <header
    class="app-header bg-[#fff] !p-4 md:!py-6 md:!px-8 bg-amber-300 drop-shadow-md drop-shadow-neutral-300"
  >
    <a
      href="#main-content"
      class="box-border fixed z-50 top-0 bg-sky-700 border-2 border-white rounded-b-md text-white text-sm font-medium px-4 py-2 pb-4 -translate-y-full focus:translate-y-0 transition-transform block"
    >
      Skip to content
    </a>
    <div class="flex items-center justify-between uppercase">
      <NuxtLink to="/" class="flex gap-3 items-center no-border">
        <icon
          size="24"
          name="line-md:text-box-twotone-to-text-box-multiple-twotone-transition"
        />
        <h1>BLOG - Nuxt MDC</h1></NuxtLink
      >

      <div class="md:block text-end">
        <NuxtLink
          class="rounded-full aspect-square w-fit p-2 flex justify-center items-center"
          to=""
          aria-label="Write a new post"
          title="Write a new post"
        >
          <icon size="24" name="line-md:edit-filled"></icon>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
