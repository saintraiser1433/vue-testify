<template>
  <button
    :type="type"
    class="btn rounded"
    :disabled="disabled"
    :class="[
      variant ? `bg-${variant}` : '',
      size === 'small' ? 'btn--small' : '',
      size === 'block' ? 'btn--block' : '',
      isRounded ? 'rounded-full ' : ''
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    variant: Boolean,
    default: false
  },
  isRounded: false,
  type: String, //button / submit
  variant: String, // primary secondary success
  size: String // small // block
})
</script>
