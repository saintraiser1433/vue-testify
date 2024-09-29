<template>
    <BaseTable :data="examineeList" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }} </td>
            <td class="table__block">{{ item.fullname }}</td>
            <td class="table__block">{{ item.username }}</td>
            <td class="table__block">{{ item.password }}</td>
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
const header = ref(['#', 'Fullname', 'Username', 'Password', 'Action']);
const examineeList = computed(() => {
    const exam = store.getters['examinee/getExaminee'];
    const myitem = [];
    for (const item of exam) {
        const data = {
            id: item.id || '',  // Fallback to an empty string or any default value if undefined
            fullname: item.first_name + ' ' + item.last_name + ' ' + item.middle_name || '',
            first_name: item.first_name || '',
            last_name: item.last_name || '',
            middle_name: item.middle_name || '',
            username: item.username || '',
            password: item.password || '',
        }
        myitem.push(data);
    }
    return myitem;


})

const handleUpdate = (val) => {
    emits("update", val)
}
const handleDelete = (val) => {
    emits("delete", val)
}







</script>
