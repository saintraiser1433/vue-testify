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
import { computed, ref, onMounted } from 'vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useToast } from '@/composables/useToast';
import { useStore } from 'vuex';
import apiClient from '@/api/axios'
const store = useStore();
const axios = useAxios();
const { setToast } = useToast();
const emits = defineEmits({
    update: Object,
    delete: Object
});
const header = ref(['#', 'Fullname', 'Username', 'Password', 'Action']);

const { data: examineeData, isLoading, isFinished, error, response, execute } = useAxios('/examinee', { method: 'GET' }, apiClient);


const examineeList = computed(() => {
    if (!error) {
        setToast("error", error);
    }

    return examineeData.value?.data?.map((item) => {
        return {
            examinee_id: item.examinee_id,
            fullname: item.first_name + ' ' + item.last_name + ' ' + item.middle_name,
            username: item.username,
            password: item.password,
        }
    })
})



onMounted(() => {
    execute();

})




// const examineeList = computed(() => {
//     const exam = store.getters['examinee/getExaminee'];
//     return exam.map((item) => {
//         return {
//             id: item.id,
//             fullname: item.first_name + ' ' + item.last_name + ' ' + item.middle_name,
//             first_name: item.first_name,
//             last_name: item.last_name,
//             middle_name: item.middle_name,
//             username: item.username,
//             password: item.password,
//         }
//     })
// })

const handleUpdate = (val) => {
    emits("update", val)
}
const handleDelete = (val) => {
    emits("delete", val)
}







</script>
