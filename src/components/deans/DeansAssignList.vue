<template>
    <BaseTable :data="deansList" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }} </td>
            <td class="table__block">{{ item.fullname }}</td>
            <td class="table__block">{{ item.department }}</td>
            <td class="table__block">{{ item.username }}</td>
            <td class="table__block">{{ item.password }}</td>
            <td class="table__block">
                <base-badge :variant="item.status === 1 ? 'success' : 'danger'">
                    {{ item.status === 1 ? 'Active' : 'Inactive' }}
                </base-badge>

            </td>
            <td class="table__block">
                <base-button type="button" variant="primary" size="small" class="mr-1 " @click="assignDeans(item)">
                    <i-gridicons-add-outline></i-gridicons-add-outline>
                </base-button>
                <base-button type="button" variant="success" size="small" class="mr-1 " @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </base-button>
                <base-button type="button" variant="secondary" size="small" class="mr-1 " @click="handleUpdate(item)">
                    <i-bx-reset></i-bx-reset>
                </base-button>
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





const department = (deptId) => {
    const department = store.getters['department/getDepartment'].find(item => item.id === deptId);
    return department ? department.department : '';
}
const deansList = computed(() => {
    const exam = store.getters['deans/getDeans'];
    const myitem = [];
    for (const item of exam) {
        const data = {
            id: item.id || '',
            fullname: `${item.first_name || ''} ${item.last_name || ''}`,
            firstname: item.first_name,
            lastname: item.last_name,
            middlename: item.middle_name,
            department: department(item.departmentId),
            departmentId: item.departmentId,
            username: item.username,
            password: item.password,
            status: item.status
        }
        myitem.push(data);
    }
    return myitem;


})
const handleDelete = (val) => {
    emits("delete", item)
}







</script>
