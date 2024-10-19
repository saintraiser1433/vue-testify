<template>
    <li>
        <router-link :to="{ name: 'Home' }" class="list__item-child ">
            <i-lucide-home :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">Dashboard</span>
        </router-link>
    </li>
    <li>
        <router-link :to="{ name: 'Examinee' }" class="list__item-child ">
            <i-fluent-hat-graduation-12-regular :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">Examinee</span>
        </router-link>
    </li>
    <li>
        <router-link :to="{ name: 'Deans' }" class="list__item-child ">
            <i-eos-icons-master-outlined class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">Deans</span>
        </router-link>
    </li>
    <li>
        <router-link :to="{ name: 'Department' }" class="list__item-child ">
            <i-gala-book class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow " :class="!isOpen ? 'lg:hidden' : ''">Department</span>
        </router-link>
    </li>
    <li>
        <router-link :to="{ name: 'Course' }" class="list__item-child ">
            <i-fluent-hat-graduation-12-regular class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">Course</span>
        </router-link>
    </li>
    <li>
        <router-link :to="{ name: 'Exam' }" class="list__item-child ">
            <i-fluent-hat-graduation-12-regular class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">Exam</span>
        </router-link>
    </li>
    <li>
        <router-link :to="{ name: 'Rankings' }" class="list__item-child ">
            <i-ph-ranking class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">Rankings</span>
        </router-link>
    </li>
    <!-- <li>
        <router-link :to="{ name: 'Settings' }" class="list__item-child ">
            <i-fluent-hat-graduation-12-regular class="text-center" />
            <span class="flex-grow">Settings</span>
        </router-link>
    </li> -->
    <!-- <li class="collapsible" :class="[isCollapse ? 'collapsible--extend' : '']">
        <div class="list__item-child" @click="collapse">
            <slot name="icon"></slot>
            <span class="flex-grow">Settings</span>
            <i-octicon-chevron-right-12 class="collapsible__chevron" />
        </div>
        <ul class="collapsible__content lg:fixed xl:fixed ">
            <li class="mt-1" v-for="child in children" :key="child">
                <router-link :to="{ name: child.routeName }" class="list__item-child">
                    <i-mdi-radiobox-indeterminate-variant class="text-center" />
                    <span class="flex-grow ">{{ child.tabName }}</span>
                </router-link>
            </li>
        </ul>
    </li> -->
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore();
import { ref, computed } from 'vue';


const isOpen = computed(() => store.getters.getToggleState);

const isCollapse = ref(false);



const collapse = () => {
    isCollapse.value = !isCollapse.value;
}
</script>