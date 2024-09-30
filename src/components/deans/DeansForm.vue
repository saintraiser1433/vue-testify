<template>
    <form @submit.prevent="submitExaminee">
        <div class="mb-3">
            <label for="firstname">First Name</label>
            <base-input type="text" id="firstname" v-model="formDeans.firstname" />
        </div>
        <div class="mb-3">
            <label for="middlename">Middle Name</label>
            <base-input type="text" id="middlename" v-model="formDeans.middlename" />
        </div>
        <div class="mb-3">
            <label for="lastname">Last Name</label>
            <base-input type="text" id="lastname" v-model="formDeans.lastname" />
        </div>
        <div class="mb-3">
            <label for="lastname">Department</label>
            <base-selector :data="departmentList" v-model.number="formDeans.departmentId" />
        </div>
        <div class="mb-3 flex  gap-2 items-center">
            <label for="status">Status:</label>
            <base-switch v-model="formDeans.status"></base-switch>
        </div>
        <base-button type="submit" class="bg-primary">{{ isUpdate ? 'Update' : 'Submit' }}</base-button>
        <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">Reset</base-button>
    </form>
</template>

<script setup>
import { useStore } from 'vuex';
import { toRefs, ref, watch, computed } from 'vue';

const emits = defineEmits(['dataDeans', 'reset']);
const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false,
    },
    formData: {
        type: Object
    }
});

const store = useStore();

const { isUpdate, formData } = toRefs(props);

// Reactive form object
const formDeans = ref({
    firstname: '',
    middlename: '',
    lastname: '',
    departmentId: null,
    status: 0
});




const departmentList = computed(() => {
    const department = store.getters['department/getDepartment'];
    return department.map((val) => {
        return {
            id: val.id,
            value: val.department
        }
    })
});




watch(
    formData,
    (newData) => {
        if (newData && JSON.stringify(formDeans.value) !== JSON.stringify(newData)) {
            formDeans.value = { ...newData };
        }
    },
    { deep: true }
);

const reset = () => {
    emits('reset');
}
const submitExaminee = () => {
    emits('dataDeans', { ...formDeans.value });

    formDeans.value.firstname = '';
    formDeans.value.middlename = '';
    formDeans.value.lastname = '';
    formDeans.value.departmentId = '';
    formDeans.value.status = 0;
};
</script>
