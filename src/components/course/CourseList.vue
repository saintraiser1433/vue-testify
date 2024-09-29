<template>
    <BaseTable :data="courseList" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }} </td>
            <td class="table__block">{{ item.course }}</td>
            <td class="table__block">{{ item.score }}</td>
            <td class="table__block">
                <base-button type="button" class="bg-success mr-1 " @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </base-button>
                <base-button type="button" class="bg-danger" @click="handleDelete(item)">
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

const emits = defineEmits({
    update: Object,
    delete: Object
});
const header = ref(['#', 'Course', 'Score Attained', 'Action']);
const courseList = computed(() => store.getters['course/getCourse'])

const handleUpdate = (val) => {
    emits("update", val)
}
const handleDelete = (val) => {
    emits("delete", val)
}







</script>
