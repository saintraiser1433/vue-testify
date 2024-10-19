<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-1 ">
      <BaseCard title="Examinee Information">
        <template #default>
          <ExamineeForm :isUpdate="isUpdate" :formData="data" @dataExaminee="submitExaminee" @reset="resetInstance">
          </ExamineeForm>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-4 ">
      <BaseCard title="List of Examinee's">
        <template #default>
          <ExamineeList :examineeData="examineeData" @update="editExaminee" @delete="removeExaminee"></ExamineeList>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useAlert } from '@/composables/useAlert'
import { useToast } from '@/composables/useToast'
import { ExamineeApi } from '@/services/examinee-services'
import { ref, onMounted } from 'vue'

import ExamineeForm from '@/components/examinee/ExamineeForm.vue';
import ExamineeList from '@/components/examinee/ExamineeList.vue'

const { setToast } = useToast()
const { setAlert } = useAlert()
const { getExaminee, insertExaminee, updateExaminee, deleteExaminee } = ExamineeApi()
const data = ref({})
const examineeData = ref([])
const isUpdate = ref(false)
const isLoading = ref(false)
/* Examinee */
const submitExaminee = async (response) => {
  try {
    isLoading.value = true
    if (!isUpdate.value) {
      const resp = await insertExaminee(response)
      examineeData.value.unshift(resp.data.examinee)
      setToast('success', resp.data.message)
    } else {
      const res = await updateExaminee(response, response.examinee_id)
      const index = examineeData.value.findIndex(
        (item) => item.examinee_id === response.examinee_id
      )
      examineeData.value[index] = { ...examineeData.value[index], ...response }
      setToast('success', res.data.message)
    }
    resetInstance();
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}

const editExaminee = (response) => {
  data.value = {
    examinee_id: response.examinee_id,
    first_name: response.first_name,
    last_name: response.last_name,
    middle_name: response.middle_name,
    username: response.username
  }
  isUpdate.value = true
}

const removeExaminee = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        isLoading.value = true
        try {
          const response = await deleteExaminee(id)
          const index = examineeData.value.findIndex((item) => item.examinee_id === id)
          if (index !== -1) {
            examineeData.value.splice(index, 1)
            return setToast('success', response.data.message)
          }
          setToast('error', 'No data existing')
        } catch (e) {
          setToast('error', e.response?.data?.error || 'An error occurred')
        } finally {
          isLoading.value = false
        }
      }
    }
  )
}

const fetchExaminees = async () => {
  isLoading.value = true
  try {
    const response = await getExaminee()
    examineeData.value = response.data
  } catch (e) {
    setToast('error', e.response?.data?.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}
const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}

onMounted(() => {
  fetchExaminees()
})
</script>
