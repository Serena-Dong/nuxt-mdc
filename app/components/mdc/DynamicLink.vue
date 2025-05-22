<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

type DynamicButton = Record<
  string,
  {
    label: string
    url: string
    color: string
  }
>

const { data: buttonData } = await useFetch<DynamicButton | null>(
  `https://dummyjson.com/c/a09c-89f1-46fa-ace9`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    transform: data => {
      console.log('data', data)
      return data ? data : null
    },
  }
)
const buttonProps = computed(() => {
  return buttonData.value?.[props.id] ?? null
})
</script>
<template>
  <Suspense suspensible>
    <div v-if="buttonProps" class="flex flex-col gap-3">
      <p class="w-full text-xs">{{ ':dynamic-link{id=' + id + '}' }}</p>
      <CustomButton :color="buttonProps.color" :href="buttonProps.url">
        {{ buttonProps.label }}
      </CustomButton>
    </div>
    <p v-else>Button not working</p>
  </Suspense>
</template>
