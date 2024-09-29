<template>
  <div class="w-full rounded-lg shadow-lg bg-cardColor  py-2 px-4">
    <div class="flex flex-col lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-2">
      <div>
        <h1 class="text-2xl">{{ title }}</h1>
        <span class="text-xs leading-none">{{ subtitle }}</span>
      </div>
      <div class="flex mt-2 text-sm lg:items-start lg:justify-end xl:items-start xl:justify-end">
        <slot name="card-action"> </slot>
      </div>
    </div>
    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title Here'
  },
  subtitle: {
    type: String,
  }
})



</script>
