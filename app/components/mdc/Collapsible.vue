<template>
  <details :open="open">
    <summary class="cursor-pointer">
      <Suspense suspensible>
        <MDCSlot name="summary" unwrap="p" />
      </Suspense>
    </summary>
    <Suspense suspensible>
      <MDCSlot name="content" />
    </Suspense>
  </details>
</template>
<script setup lang="ts">
defineProps<{
  open?: boolean;
}>();
</script>
