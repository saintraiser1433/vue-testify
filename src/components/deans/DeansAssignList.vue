<template>
    <BaseTable :data="deansList" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }} </td>
            <td class="table__block">{{ item.course }}</td>
            <td class="table__block">
                <base-button type="button" size="small" variant="danger" @click="handleDelete(item)">
                    <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
                </base-button>
            </td>
        </template>
    </BaseTable>

</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const emits = defineEmits(['delete']);
const header = ref(['#', 'Course Assigned', 'Action']);
const props = defineProps({
    deanId: Number
})

const deansList = computed(() => {
    const deansAssign = store.getters['deans/getAssignDeans'];
    const course = store.getters['course/getCourse'];

    return course.filter((item) => deansAssign.some((deans) => deans.courseId === item.id && deans.deanId === props.deanId)
    ).map((res) => {
        return {
            id: res.id,
            course: res.course
        };
    })

    // Filter and map the assigned deans to their respective courses

    // const filtered = deansAssign.filter((dean) => dean.deanId === props.deanId)
    //     .map((dean) => course.find((course) => course.id === dean.courseId));

    // return filtered.map((item, index) => {
    //     const dean = deansAssign.find(dean => dean.deanId === props.deanId && course.find((course) => course.id === dean.courseId) === item);

    //     return {
    //         id: dean ? dean.id : '',  // Ensure dean is found
    //         deanId: item ? item.id : '', // Ensure item is found
    //         course: item ? item.course : '', // Ensure item is found
    //     };
    // });
});

const handleDelete = (item) => {
    emits("delete", item.id)
}







</script>
