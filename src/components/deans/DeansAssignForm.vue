<template>
    <form @submit.prevent="submitCourse">
        <div class="mb-3 border-b border-colorBorder py-5">
            <label for="course">Course:</label>
            <base-selector class="text-base" v-model.number="courseId" :data="mapCourseAvailable"></base-selector>
        </div>
        <base-button type="submit" variant="primary" size="sm">Submit</base-button>
    </form>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    deanId: Number
})

const emits = defineEmits(['formData']);

const courseId = ref(null);



const store = useStore()

const mapCourseAvailable = computed(() => {
    const deansAssign = store.getters['deans/getAssignDeans'];
    const course = store.getters['course/getCourse'];
    return course
        .filter((res) => !deansAssign.some(item => item.courseId === res.id && item.deanId === props.deanId))
        .map((res) => {
            return {
                id: res.id || 0,
                value: res.course || ''
            }
        });

})

const submitCourse = () => {

    emits('formData', courseId.value);
    courseId.value = null;
}

</script>
