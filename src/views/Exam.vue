<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-4 xl:col-span-3">
      <BaseCard title="Exam Information">
        <template #default>
          <exam-form :isUpdate="isUpdate" :formData="data" @dataExam="submitExam" @reset="resetInstance"></exam-form>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-12 lg:col-span-8 xl:col-span-9">
      <BaseCard title="List of Exam's">
        <template #default>
          <exam-list @update="editExam" @delete="removeExam"></exam-list>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useAlert } from '@/composables/useAlert'
import { useToast } from '@/composables/useToast'
import { ExamApi } from '@/services/exam-services'

import { defineAsyncComponent, ref } from 'vue'

const ExamForm = defineAsyncComponent(() => import('../components/exam/ExamForm.vue'))
const ExamList = defineAsyncComponent(() => import('../components/exam/ExamList.vue'))

const store = useStore()
const { setToast } = useToast()
const { setAlert } = useAlert()
const { insertExam, updateExam, deleteExam } = ExamApi()
const data = ref({})
const isUpdate = ref(false)

/* Exam */
const submitExam = async (response) => {
  try {
    if (!isUpdate.value) {
      const res = await insertExam(response)
      store.dispatch('exam/addExam', res.data.data)
      setToast('success', res.data.message)
    } else {
      const updateData = {
        exam_title: response.exam_title,
        description: response.description,
        time_limit: response.time_limit,
        question_limit: response.question_limit
      }
      const res = await updateExam(updateData, response.exam_id)
      store.dispatch('exam/editExam', response)
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
          await deleteExam(response.exam_id)
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