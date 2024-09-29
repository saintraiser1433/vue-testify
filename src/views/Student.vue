<template>
    <div class="grid grid-cols-5 gap-2">
        <div class="col-span-5 lg:col-span-2 xl:col-span-2">
            <BaseCard title="Examinee Information">
                <template #default>
                    <examinee-form :isUpdate="isUpdate" :formData="data" @dataExaminee="submitExaminee"
                        @reset="resetInstance"></examinee-form>
                </template>
            </BaseCard>
        </div>
        <div class="col-span-5 lg:col-span-3 xl:col-span-3">
            <BaseCard title="List of Examinee's">
                <!-- :formData="editExaminee" -->
                <template #default>
                    <examinee-table @update="editExaminee" @delete="deleteExaminee"></examinee-table>
                </template>
            </BaseCard>
        </div>

    </div>

</template>

<script setup>

import { useStore } from 'vuex'
import { useToast } from '@/composables/useToast';
import { defineAsyncComponent, ref } from 'vue'

const ExamineeForm = defineAsyncComponent(() => import('../components/examinee/ExamineeForm.vue'));
const ExamineeTable = defineAsyncComponent(() => import('../components/examinee/ExamineeList.vue'));

const store = useStore();
const { setToast } = useToast();
const data = ref({});
const isUpdate = ref(false);
/* Examinee */



const submitExaminee = (response) => {
    if (!isUpdate.value) {
        store.dispatch('examinee/setExaminee', response);
        setToast('Successfully submitted')
    } else {
        store.dispatch('examinee/editExaminee', response);
        setToast('Successfully updated')
    }
    isUpdate.value = false;

}

const editExaminee = (response) => {
    const res = {
        id: response.id,
        firstname: response.first_name,
        lastname: response.last_name,
        middlename: response.middle_name,
    }
    data.value = res;
    isUpdate.value = true;
}
const deleteExaminee = (response) => {
    store.dispatch('examinee/removeExaminee', response);
    setToast('Successfully deleted')
}

const resetInstance = () => {
    isUpdate.value = false;
    data.value = {}
}




</script>
