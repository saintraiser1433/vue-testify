<template>
    <footer :class="isOpen ? 'lg:ml-60 lg:w-[calc(100%-15rem)]' : 'lg:ml-20 lg:w-[calc(100%-5rem)] '"
        class="fixed bottom-0 col-span-2 col-start-2 w-full lg: lg:px-5  text-center transition-all ease-in-out">
        <div class="bg-darken py-2 rounded-md px-2">
            <p class="text-sm">Developed by: John Rey Decosta</p>
        </div>
    </footer>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore();
const isOpen = computed(() => store.getters.getToggleState);
</script>