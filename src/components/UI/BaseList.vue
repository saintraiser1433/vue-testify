<template>
    <li>
        <router-link :to="{ name: link }" class="list__item-child ">
            <slot name="icon"></slot>
            <span class="flex-grow">{{ title }}</span>
        </router-link>
    </li>

</template>

<script setup>
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';


const props = defineProps({
    link: String,
    title: String
});

const { link, title } = toRefs(props);

// const checkActive = computed(() => link.value === route.name);


</script>
