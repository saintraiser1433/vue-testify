<template>
    <form @submit.prevent="submitExaminee">
        <div class="mb-2">
            <label for="firstname">First Name</label>
            <base-input type="text" id="firstname" v-model="formExaminee.firstname" />
        </div>
        <div class="mb-2">
            <label for="middlename">Middle Name</label>
            <base-input type="text" id="middlename" v-model="formExaminee.middlename" />
        </div>
        <div class="mb-2">
            <label for="lastname">Last Name</label>
            <base-input type="text" id="lastname" v-model="formExaminee.lastname" />
        </div>

        <base-button type="submit" class="bg-primary">{{ isUpdate ? 'Update' : 'Submit' }}</base-button>
        <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">Reset</base-button>
    </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue';

const emits = defineEmits(['dataExaminee', 'reset']);

const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false,
    },
    formData: {
        type: Object
    }
});

const { isUpdate, formData } = toRefs(props);

// Reactive form object
const formExaminee = ref({
    firstname: '',
    middlename: '',
    lastname: ''
});


watch(
    formData,
    (newData) => {
        if (newData && JSON.stringify(formExaminee.value) !== JSON.stringify(newData)) {
            formExaminee.value = { ...newData };
        }
    },
    { deep: true }
);

const reset = () => {
    emits('reset');
}

// Emit form data on submit
const submitExaminee = () => {
    emits('dataExaminee', { ...formExaminee.value });
    formExaminee.value.firstname = '';
    formExaminee.value.middlename = '';
    formExaminee.value.lastname = '';
};
</script>
