<template>
    <div class="mb-3">
        <label for="course"></label>
        <base-selector :data="mapCourseAvailable"></base-selector>
    </div>

</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    deanId: Number,
})


const store = useStore()

const mapCourseAvailable = computed(() => {
    const deansAssign = store.getters['deans/getAssignDeans'];
    const course = store.getters['course/getCourse'];
    const filtered = deansAssign.filter((dean) => dean.deanId === 1)
        .map((dean) => course.find((course) => course.id !== dean.courseId));
    return filtered.map((item) => {
        return {
            id: item.id || 0,
            value: item.course || ''
        }
    })
})

</script>
