<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main id="main-content" class="flex-grow basis-0">
      <slot></slot>
    </main>
  </div>
</template>
