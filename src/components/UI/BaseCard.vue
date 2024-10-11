<template>
  <div class="w-full rounded-lg shadow-lg bg-cardColor py-2 px-4">
    <div v-if="title" :class="{ 'mb-3': title }" class="flex flex-col lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-12">
      <div class="col-span-8">
        <h1 class="md:text-3xl xl:text-2xl">{{ title }}</h1>
        <span class="text-xs leading-none">{{ subtitle }}</span>
      </div>
      <div class="flex mt-2 text-sm lg:items-start lg:justify-end xl:items-start xl:justify-end xl:col-span-4">
        <slot name="card-action"> </slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String
  }
})
</script>
