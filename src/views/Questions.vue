<template>
  <div class="grid grid-cols-8 gap-5">
    <div class="col-span-12 lg:col-span-2">
      <base-card title="Question Information">
        <QuestionForm :formData="data" :isUpdate="isUpdate" @dataQuestChoice="submitQuestion" @reset="resetForm">
        </QuestionForm>
      </base-card>
    </div>
    <div class="col-span-12 lg:col-span-6 ">
      <base-card title="Question List">
        <QuestionList :questionData="questionData" @update="editQuestionChoices" @delete="removeQuestionChoices">
        </QuestionList>
      </base-card>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useAlert } from '@/composables/useAlert'
import { QuestionChoicesApi } from '@/services/question-choices-services'
const QuestionForm = defineAsyncComponent(() => import('@/components/question/QuestionForm.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/question/QuestionList.vue'))

const { insertQuestChoices, updateQuestChoices, deleteQuestionChoices, getQuestionChoicesById } =
  QuestionChoicesApi()
const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref({})
const questionData = ref([])
const isUpdate = ref(false)
const isLoading = ref(false);
const props = defineProps({
  examId: String
})

const submitQuestion = async (response) => {
  try {
    isLoading.value = true
    if (!isUpdate.value) {
      const res = await insertQuestChoices(response)
      questionData.value.unshift(res.data.data)
      setToast('success', res.data.message)
    } else {
      const res = await updateQuestChoices(response, response.question_id)
      const findIndex = questionData.value.findIndex(
        (item) => item.question_id === response.question_id
      )
      questionData.value[findIndex] = { ...questionData.value[findIndex], ...response }
      setToast('success', res.data.message)
    }
    resetForm()
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}

const editQuestionChoices = (response) => {
  data.value = response
  isUpdate.value = true
}

const removeQuestionChoices = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          isLoading.value = true
          const res = await deleteQuestionChoices(id)
          const findIndex = questionData.value.findIndex((item) => item.question_id === id)
          if (findIndex !== -1) {
            questionData.value.splice(findIndex, 1)
            setToast('success', res.data.message)
          }
        } catch (e) {
          setToast('error', e.response.data.error || 'An error occurred')
        } finally {
          isLoading.value = false
        }
      }
    }
  )
}

const fetchQuestChoice = async () => {
  try {
    isLoading.value = true
    const response = await getQuestionChoicesById(props.examId)
    questionData.value = response.data
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  isUpdate.value = false
}

onMounted(() => {
  fetchQuestChoice()
})
</script>