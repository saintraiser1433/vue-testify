<template>
    <div class="grid grid-cols-5 gap-2">
        <div class="col-span-5 lg:col-span-2 xl:col-span-2">
            <BaseCard title="Department Information">
                <template #default>
                    <department-form :isUpdate="isUpdate" :formData="data" @dataDepartment="submitDepartment"
                        @reset="resetInstance"></department-form>
                </template>
            </BaseCard>
        </div>
        <div class="col-span-5 lg:col-span-3 xl:col-span-3">
            <BaseCard title="List of Department's">
                <!-- :formData="editExaminee" -->
                <template #default>
                    <department-list @update="editDepartment" @delete="deleteDepartment"></department-list>
                </template>
            </BaseCard>
        </div>

    </div>

</template>

<script setup>

import { useStore } from 'vuex'
import { useToast } from '@/composables/useToast';
import { defineAsyncComponent, ref } from 'vue'

const DepartmentForm = defineAsyncComponent(() => import('../components/department/DepartmentForm.vue'));
const DepartmentList = defineAsyncComponent(() => import('../components/department/DepartmentList.vue'));

const store = useStore();
const { setToast } = useToast();
const data = ref({});
const isUpdate = ref(false);
/* Department */
const submitDepartment = (response) => {
    if (!isUpdate.value) {
        store.dispatch('department/setDepartment', response);
        setToast('success', 'Successfully submitted')
    } else {
        store.dispatch('department/editDepartment', response);
        setToast('success', 'Successfully updated')
    }
    isUpdate.value = false;

}

const editDepartment = (response) => {

    data.value = {
        id: response.id,
        department: response.department,
        status: response.status
    }
    isUpdate.value = true;
}
const deleteDepartment = (response) => {
    store.dispatch('department/removeDepartment', response);
    setToast('success', 'Successfully deleted')
}

const resetInstance = () => {
    isUpdate.value = false;
    data.value = {}
}




</script>
