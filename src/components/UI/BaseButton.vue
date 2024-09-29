<template>
  <button :type="type" class="btn" :disabled="disabled" :class="[
    variant ? `bg-${variant}` : '',
    size === 'small' ? 'btn--small' : '',
    size === 'block' ? 'btn--block' : ''
  ]">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    variant: Boolean,
    default: false
  },
  type: String, //button / submit
  variant: String, // primary secondary success
  size: String // small // block

})

</script>
