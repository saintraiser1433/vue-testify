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
                <template #default>
                    <department-list :departmentData="departmentData" @update="editDepartment"
                        @delete="removeDepartment"></department-list>
                </template>
            </BaseCard>
        </div>

    </div>

</template>

<script setup>
import { useToast } from '@/composables/useToast';
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { useAlert } from '@/composables/useAlert';
import { DepartmentApi } from '@/services/department-services';
const DepartmentForm = defineAsyncComponent(() => import('../components/department/DepartmentForm.vue'));
const DepartmentList = defineAsyncComponent(() => import('../components/department/DepartmentList.vue'));
const { getDepartment, insertDepartment, updateDepartment, deleteDepartment } = DepartmentApi();
const { setToast } = useToast();
const { setAlert } = useAlert();
const data = ref({});
const isUpdate = ref(false);
const departmentData = ref([]);
/* Department */
const submitDepartment = async (response) => {
    try {
        if (!isUpdate.value) {
            const createdDepartment = await insertDepartment(response)
            departmentData.value.unshift(createdDepartment.data.data);
            setToast('success', createdDepartment.data.message)
        } else {
            const updatedDepartment = await updateDepartment(response, response.department_id);
            const index = departmentData.value.findIndex((item) => item.department_id === response.department_id);
            departmentData.value[index] = { ...response }
            setToast('success', updatedDepartment.data.message)
        }
    } catch (err) {
        setToast('error', err.response.data.error)
    } finally {
        isUpdate.value = false;
    }
}

const editDepartment = (response) => {
    data.value = response
    isUpdate.value = true;
}
const removeDepartment = (id) => {
    setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteDepartment(id)
                    const index = departmentData.value.findIndex((item) => item.department_id === id)
                    departmentData.value.splice(index, 1)
                    setToast('success', res.data.message)
                } catch (e) {
                    setToast('error', e.response.data.error || 'An error occurred')
                }
            }
        }
    )
}



const resetInstance = () => {
    isUpdate.value = false;
    data.value = {}
}

const fetchDepartment = async () => {
    try {
        const response = await getDepartment();

        departmentData.value = response.data;
    } catch (err) {
        setToast('error', err.response.data.error || 'An error occurred')
    }
}

onMounted(() => {
    fetchDepartment();
})




</script>
