<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String as PropType<
      | "_blank"
      | "_parent"
      | "_self"
      | "_top"
      | (string & object)
      | null
      | undefined
    >,
    default: undefined,
    required: false,
  },
});

const localizedURL = computed(() => {
  const isInternalLink = props.href.startsWith("/");
  return isInternalLink ? `/it${props.href}` : props.href;
});
</script>

<template>
  <NuxtLink :to="localizedURL" :target="props.target">
    <slot />
  </NuxtLink>
</template>
