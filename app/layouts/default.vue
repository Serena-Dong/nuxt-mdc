<template>
  <div class="flex flex-col min-h-dvh">
    <AppHeader />
    <main id="main-content" class="flex-grow basis-0">
      <slot></slot>
    </main>
  </div>
</template>
