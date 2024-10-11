<template>
  <div class="relative inline-block h-7 w-14 border border-colorBorder rounded-3xl">
    <input type="checkbox" v-model="isCheck" :true-value="1" :false-value="0" class="hidden" />
    <span
      @click="toggleCheck"
      class="relative inline-block h-full w-full bg-gray-600 cursor-pointer rounded-full transition-colors duration-300"
      :class="{ 'bg-primary': isCheck }"
    >
      <span
        class="absolute h-[1.5rem] w-[1.6rem] bg-gray-300 rounded-full transition-all duration-300 left-1"
        :class="[isCheck ? 'translate-x-6' : 'translate-x-0']"
        aria-checked="1"
        role="switch"
      ></span>
    </span>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, Boolean],
    default: 0
  }
})
const emits = defineEmits(['update:modelValue'])
const isCheck = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== isCheck.value) {
      isCheck.value = newValue
    }
  }
)

const toggleCheck = () => {
  isCheck.value = isCheck.value === 1 ? 0 : 1
  emits('update:modelValue', isCheck.value)
}
</script>
