<template>
    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <base-card title="Question Information">
                <question-form @dataQuestChoice="submitQuestion" :formData="data" :isUpdate="isUpdate"
                    @reset="resetInstance">
                </question-form>
            </base-card>
        </div>
        <div class="col-span-12 lg:col-span-4 xl:col-span-8">
            <base-card title="Question List">
                <question-list @update="editExam" @delete="removeExam"></question-list>
            </base-card>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { ChoicesApi } from '@/services/choices-services';
import { QuestionApi } from '@/services/question-services';
import { useStore } from 'vuex';
import { useToast } from '@/composables/useToast';
import { useAlert } from '@/composables/useAlert';
const QuestionForm = defineAsyncComponent(() => import('@/components/question/QuestionForm.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/question/QuestionList.vue'))
const { insertQuestion, updateQuestion, deleteQuestion } = QuestionApi();
const { insertChoices, updateChoices, deleteChoices } = ChoicesApi()
const store = useStore()
const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref({});
const isUpdate = ref(false);


const submitQuestion = async (response) => {
    try {
        if (!isUpdate.value) {
            const questionData = {
                exam_id: response.exam_id,
                question: response.question
            }
            const questionId = await insertQuestion()
            const res = await insertChoices(response)
            store.dispatch('questChoices/addQuestChoices', res.data.data)
            setToast('success', res.data.message)
        } else {
            const updateData = {
                exam_title: response.exam_title,
                description: response.description,
                time_limit: response.time_limit,
                question_limit: response.question_limit
            }
            const res = await updateChoices(updateData, response.exam_id)
            store.dispatch('questChoices/updateQuestChoice', response)
            setToast('success', res.data.message)
        }
    } catch (e) {
        setToast('error', e.response.data.error || 'An error occurred')
    } finally {
        isUpdate.value = false
    }
}

const editExam = (response) => {
    data.value = response
    isUpdate.value = true
}

const removeExam = (response) => {
    setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteChoices(response.exam_id)
                    store.dispatch('exam/removeExam', response)
                    setToast('success', 'Successfully deleted')
                } catch (e) {
                    setToast('error', e.response.data.error || 'An error occurred')
                }
            }
        }
    )
}

const resetInstance = () => {
    isUpdate.value = false
    data.value = {}
}




</script>