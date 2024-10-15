<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-4 xl:col-span-4">
      <base-card title="Question Information">
        <question-form
          :formData="data"
          :isUpdate="isUpdate"
          @dataQuestChoice="submitQuestion"
          @reset="resetForm"
        >
        </question-form>
      </base-card>
    </div>
    <div class="col-span-12 lg:col-span-4 xl:col-span-8">
      <base-card title="Question List">
        <question-list
          :questionData="questionData"
          @update="editQuestionChoices"
          @delete="removeQuestionChoices"
        ></question-list>
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
const props = defineProps({
  examId: String
})

const submitQuestion = async (response) => {
  try {
    if (!isUpdate.value) {
      const res = await insertQuestChoices(response)
      questionData.value.unshift(res.data.data)
      setToast('success', res.data.message)
    } else {
      const res = await updateQuestChoices(response, response.question_id)
      const findIndex = questionData.value.findIndex(
        (item) => item.question_id === response.question_id
      )
      if (findIndex !== -1) {
        questionData.value[findIndex] = response
      }
      setToast('success', res.data.message)
    }
    resetForm()
  } catch (e) {
    console.log(e)
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isUpdate.value = false
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
          const res = await deleteQuestionChoices(id)
          const findIndex = questionData.value.findIndex((item) => item.question_id === id)
          if (findIndex !== -1) {
            questionData.value.splice(findIndex, 1)
            setToast('success', res.data.message)
          }
        } catch (e) {
          setToast('error', e.response.data.error || 'An error occurred')
        }
      }
    }
  )
}

const fetchQuestChoice = async () => {
  try {
    const response = await getQuestionChoicesById(parseInt(props.examId))
    console.log(response)
    questionData.value = response.data
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

fetchQuestChoice()

const resetForm = () => {
  isUpdate.value = false
}

// onMounted(() => {
//   fetchQuestChoice()
// })
</script>