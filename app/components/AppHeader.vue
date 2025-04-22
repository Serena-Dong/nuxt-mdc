<script setup lang="ts"></script>
<template>
  <header>
    <div class="p-4">
      <div class="flex justify-between items-center border-b-2 border-gray-400">
        <h5 class="uppercase">Nuxt-mdc</h5>

        <ul class="flex text-gray-500 gap-2">
          <li>
            <NuxtLink
              class="flex items-center gap-2"
              to="https://nuxt.com/modules/mdc"
              target="_blank"
              >Documentation <icon name="line-md:external-link"></icon>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="flex items-center justify-center">
        <h1 class="uppercase text-7xl md:text-8xl">Minimal Blog</h1>
      </div>
    </div>
  </header>
</template>
