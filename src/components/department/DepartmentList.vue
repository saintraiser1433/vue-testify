<template>
    <BaseTable :data="departmentList" :header="header">
        <template #row="{ item, index }">
            <td class="table__block">{{ index + 1 }} </td>
            <td class="table__block">{{ item.department }}</td>
            <td class="table__block">
                <base-badge :variant="item.status === 1 ? 'success' : 'danger'">
                    {{ item.status === 1 ? 'Active' : 'Inactive' }}
                </base-badge>
            </td>
            <td class="table__block">
                <base-button type="button" variant="success" size="small" class=" mr-1 " @click="handleUpdate(item)">
                    <i-bx-edit></i-bx-edit>
                </base-button>
                <base-button type="button" variant="danger" size="small" @click="handleDelete(item)">
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
const header = ref(['#', 'Department', 'Status', 'Action']);
const departmentList = computed(() => store.getters['department/getDepartment'])

const handleUpdate = (val) => {
    emits("update", val)
}



const handleDelete = (val) => {
    emits("delete", val)
}







</script>
