<template>
  <select
    class="rounded-sm py-1 px-2 mt-2 bg-darken outline-none border w-full capitalize border-colorBorder focus:border-primary"
    :value="modelValue"
    @change="updateModel"
  >
    <option value="" selected>Select First</option>
    <option v-for="i in data" :key="i.id" :value="i.id">{{ i.value }}</option>
  </select>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  modelValue: [String, Number]
})

const updateModel = (event) => {
  emits('update:modelValue', event.target.value)
}
</script>
