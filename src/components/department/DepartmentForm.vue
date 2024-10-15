<template>
    <form @submit.prevent="submitDepartment">
        <div class="mb-3">
            <label for="department">Department:</label>
            <base-input type="text" class="mt-2" id="department" v-model="formDepartment.department" />
        </div>
        <div class="mb-3 flex  gap-2 items-center">
            <label for="status">Status:</label>
            <base-switch v-model="formDepartment.status"></base-switch>
        </div>

        <base-button type="submit" class="bg-primary">{{ isUpdate ? 'Update' : 'Submit' }}</base-button>
        <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">Reset</base-button>
    </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue';

const emits = defineEmits(['dataDepartment', 'reset']);

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
const formDepartment = ref({
    department: '',
    status: true,
});

const submitDepartment = () => {
    emits('dataDepartment', { ...formDepartment.value });
};

const reset = () => {
    emits('reset');
}


watch(
    formData,
    (newData) => {
        if (newData) {
            formDepartment.value = { ...newData };
        }
    },
    { deep: true }
);
</script>
