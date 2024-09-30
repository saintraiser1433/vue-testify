<template>

    <div class="grid grid-cols-5 gap-2">
        <div class="col-span-5 lg:col-span-2 xl:col-span-2">
            <BaseCard title="Deans Information">
                <template #default>
                    <deans-form :isUpdate="isUpdate" :formData="data" @dataDeans="submitDeans"
                        @reset="resetInstance"></deans-form>
                </template>
            </BaseCard>
        </div>
        <div class="col-span-5 lg:col-span-3 xl:col-span-3">
            <BaseCard title="List of Dean's">
                <template #default>
                    <deans-list @assign="assignDeans" @update="editDeans" @delete="deleteDeans"></deans-list>
                </template>
            </BaseCard>
        </div>

    </div>
    <base-modal :isToggle="isToggle" size="xxxl" title="Add Assignee" @close="closeModal">
        <template #default>
            <div class="grid grid-cols-12 gap-2">
                <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                    <BaseCard title="Course Information">
                        <template #default>
                            <assign-form :isUpdate="isUpdate" :deanId="deanId" :formData="data" @dataDeans="submitDeans"
                                @reset="resetInstance"></assign-form>
                        </template>
                    </BaseCard>
                </div>
                <div class="col-span-12 lg:col-span-8 xl:col-span-8">
                    <BaseCard title="Courses Assigned">
                        <template #default>
                            <assign-list @delete="deleteAssignCourse" :deanId="deanId"></assign-list>
                        </template>
                    </BaseCard>
                </div>
            </div>
        </template>

    </base-modal>
</template>

<script setup>
import { useStore } from 'vuex'
import { useAlert } from '@/composables/useAlert';
import { useToast } from '@/composables/useToast';
import { defineAsyncComponent, ref } from 'vue'

const DeansForm = defineAsyncComponent(() => import('../components/deans/DeansForm.vue'));
const DeansList = defineAsyncComponent(() => import('../components/deans/DeansList.vue'));
const AssignForm = defineAsyncComponent(() => import('../components/deans/DeansAssignForm.vue'));
const AssignList = defineAsyncComponent(() => import('../components/deans/DeansAssignList.vue'));
const store = useStore();
const { setToast } = useToast();
const { setAlert } = useAlert();
const data = ref({});
const isUpdate = ref(false);
const isToggle = ref(false);
const deanId = ref(null);


/* Deans */
const submitDeans = (response) => {
    console.log(response);
    if (!isUpdate.value) {
        store.dispatch('deans/setDeans', response);
        setToast('success', "Successfully submitted")
    } else {

        store.dispatch('deans/editDeans', response);
        setToast('success', "Successfully updated")
    }
    isUpdate.value = false;

}

const assignDeans = (response) => {
    deanId.value = response.id;
    isToggle.value = true;
}

const editDeans = (response) => {
    data.value = {
        id: response.id,
        firstname: response.firstname,
        lastname: response.lastname,
        middlename: response.middlename,
        departmentId: response.departmentId,
        status: response.status

    };
    isUpdate.value = true;
}
const deleteDeans = (response) => {
    setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete')
        .then((result) => {
            if (result.isConfirmed) {
                console.log(response);
                store.dispatch('deans/removeDeans', response);
                setToast('success', 'Successfully deleted');
            }
        });
};

const deleteAssignCourse = (response) => {
    setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete')
        .then((result) => {
            if (result.isConfirmed) {
                console.log(response);
                store.dispatch('deans/removeAssignCourse', response);
                setToast('success', 'Successfully deleted');
            }
        });
};
const resetInstance = () => {
    isUpdate.value = false;
    data.value = {}
}


const closeModal = (response) => {
    isToggle.value = false;
}






</script>
