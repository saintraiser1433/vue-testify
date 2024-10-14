<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-4 xl:col-span-4">
      <base-card title="Question Information">
        <question-form
          @dataQuestChoice="submitQuestion"
          :formData="data"
          :isUpdate="isUpdate"
          @reset="resetInstance"
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
import { ChoicesApi } from '@/services/choices-services'
import { useStore } from 'vuex'
import { useToast } from '@/composables/useToast'
import { useRoute } from 'vue-router'
import { useAlert } from '@/composables/useAlert'
import { QuestionApi } from '@/services/question-services'
const QuestionForm = defineAsyncComponent(() => import('@/components/question/QuestionForm.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/question/QuestionList.vue'))
const { insertQuestChoices, updateQuestion, deleteQuestionChoices } = QuestionApi()
// const { insertChoices, updateChoices, deleteChoices } = ChoicesApi()
const store = useStore()
const { setToast } = useToast()
const { setAlert } = useAlert()
const route = useRoute()
const data = ref({})
const questionData = ref([])
const isUpdate = ref(false)

const submitQuestion = async (response) => {
  try {
    if (!isUpdate.value) {
      const res = await insertQuestChoices(response)
      questionData.value.unshift(res.data.data)
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
            return setToast('success', res.data.message)
          }
          setToast('error', 'No data existing')
        } catch (e) {
          setToast('error', e.response.data.error || 'An error occurred')
        }
      }
    }
  )
}

const fetchQuestChoice = async () => {
  const id = route.params.id
  try {
    const response = await ChoicesApi().getChoicesByExamId(id)
    questionData.value = response.data
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}

onMounted(() => {
  fetchQuestChoice()
})
</script>