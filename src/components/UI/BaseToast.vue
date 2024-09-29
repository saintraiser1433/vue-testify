<template>
    <teleport to="body">
        <div
            :class="['fixed top-0 right-0 my-2 transition  ease-in-out duration-500', toast.type ? '-translate-x-5' : 'translate-x-full']">
            <div class="flex justify-between items-center py-2 px-3 rounded-sm bg-success">
                <i-lets-icons-check-fill class="mr-2"></i-lets-icons-check-fill>
                <span class="capitalize">{{ toast.message }}</span>
            </div>
        </div>
    </teleport>

</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useToast } from '@/composables/useToast';


const { clearToast } = useToast();
const store = useStore();

const toast = computed(() => store.getters.getToastState);



watch(() => toast.value.type, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            clearToast();
        }, toast.value.duration);
    }
});





</script>
