<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-4 xl:col-span-3">
      <BaseCard title="Exam Information">
        <template #default>
          <ExamForm
            :isUpdate="isUpdate"
            :formData="data"
            @dataExam="submitExam"
            @reset="resetInstance"
          ></ExamForm>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-12 lg:col-span-8 xl:col-span-9">
      <BaseCard title="List of Exam's">
        <template #default>
          <ExamList :examData="examData" @update="editExam" @delete="removeExam"></ExamList>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert'
import { useToast } from '@/composables/useToast'
import { ExamApi } from '@/services/exam-services'

import { defineAsyncComponent, ref, onMounted } from 'vue'

const ExamForm = defineAsyncComponent(() => import('../components/exam/ExamForm.vue'))
const ExamList = defineAsyncComponent(() => import('../components/exam/ExamList.vue'))
const { setToast } = useToast()
const { setAlert } = useAlert()
const { getExam, insertExam, updateExam, deleteExam } = ExamApi()
const data = ref({})
const isUpdate = ref(false)
const examData = ref([])
/* Exam */
const submitExam = async (response) => {
  try {
    if (!isUpdate.value) {
      const createdExam = await insertExam(response)
      examData.value.unshift(createdExam.data.exam)
      setToast('success', createdExam.data.message)
    } else {
      const updatedExam = await updateExam(response, response.exam_id)
      const index = examData.value.findIndex((i) => i.exam_id === response.exam_id)
      examData.value[index] = { ...examData.value[index], ...response }
      setToast('success', updatedExam.data.message)
    }
    resetInstance()
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

const editExam = (response) => {
  data.value = response
  isUpdate.value = true
}
const removeExam = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteExam(id)
          const index = examData.value.findIndex((i) => i.exam_id === id)
          examData.value.splice(index, 1)
          setToast('success', response.data.message)
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

const fetchExam = async () => {
  try {
    const response = await getExam()
    examData.value = response.data
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

onMounted(() => {
  fetchExam()
})
</script>