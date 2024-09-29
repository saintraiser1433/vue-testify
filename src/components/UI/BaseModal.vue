<template>
    <teleport to="body">

        <div v-show="isToggle" class="h-screen w-screen backdrop-blur-sm bg-black/50 z-50 fixed top-0 left-0">
        </div>
        <div v-show="isToggle"
            class="fixed top-1/2 left-1/2 min-h-lg w-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-50 bg-cardColor border border-cardColor rounded-lg"
            :class="{
                'max-w-6xl': size === 'xxxl',
                'max-w-4xl': size === 'xxl',
                'max-w-2xl': size === 'xl',
                'max-w-lg': size === 'large',
                'max-w-md': size === 'medium',
                'max-w-sm': size === 'small',
                'max-w-sm': size === null
            }">
            <div class="flex border-b-2 border-gray-600 justify-between items-center p-3">
                <h2 class="font-semibold">{{ title }}</h2>
                <div class="cursor-pointer p-2" @click="close">
                    <i-streamline-delete-1-solid class="w-3 h-3" />
                </div>
            </div>
            <div class="px-3 py-2">
                <slot></slot>
            </div>

        </div>
    </teleport>
</template>

<script setup>
const emits = defineEmits(['close'])
const props = defineProps({
    isToggle: Boolean,
    title: String,
    data: Object,
    size: {
        type: String,
        default: null
    },
})

const close = () => {
    emits('close');
}


</script>
