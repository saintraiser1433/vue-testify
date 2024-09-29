<template>
    <div class="grid grid-cols-5 gap-2">
        <div class="col-span-5 lg:col-span-2 xl:col-span-2">
            <BaseCard title="Course Information">
                <template #default>
                    <course-form :isUpdate="isUpdate" :formData="data" @dataCourse="submitCourse"
                        @reset="resetInstance"></course-form>
                </template>
            </BaseCard>
        </div>
        <div class="col-span-5 lg:col-span-3 xl:col-span-3">
            <BaseCard title="List of Course's">
                <!-- :formData="editExaminee" -->
                <template #default>
                    <course-list @update="editCourse" @delete="deleteCourse"></course-list>
                </template>
            </BaseCard>
        </div>

    </div>

</template>

<script setup>

import { useStore } from 'vuex'
import { useToast } from '@/composables/useToast';
import { defineAsyncComponent, ref } from 'vue'

const CourseForm = defineAsyncComponent(() => import('../components/course/CourseForm.vue'));
const CourseList = defineAsyncComponent(() => import('../components/course/CourseList.vue'));

const store = useStore();
const { setToast } = useToast();
const data = ref({});
const isUpdate = ref(false);
/* Examinee */



const submitCourse = (response) => {
    if (!isUpdate.value) {
        store.dispatch('course/setCourse', response);
        setToast('success', 'Successfully submitted')
    } else {
        store.dispatch('course/editCourse', response);
        setToast('success', 'Successfully updated')
    }
    isUpdate.value = false;

}

const editCourse = (response) => {
    const res = {
        id: response.id,
        course: response.course,
        prefix: response.prefix,
        score: response.score,
    }
    data.value = res;
    isUpdate.value = true;
}
const deleteCourse = (response) => {
    store.dispatch('course/removeCourse', response);
    setToast('success', 'Successfully deleted')
}

const resetInstance = () => {
    isUpdate.value = false;
    data.value = {}
}




</script>
