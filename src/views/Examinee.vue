<template>
  <div class="grid grid-cols-5 gap-2">
    <div class="col-span-5 lg:col-span-2 xl:col-span-2">
      <BaseCard title="Examinee Information">
        <template #default>
          <examinee-form :isUpdate="isUpdate" :formData="data" @dataExaminee="submitExaminee"
            @reset="resetInstance"></examinee-form>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-3">
      <BaseCard title="List of Examinee's">
        <template #default>
          <examinee-list @update="editExaminee" @delete="removeExaminee"></examinee-list>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useAlert } from '@/composables/useAlert'
import { useToast } from '@/composables/useToast'
import { ExamineeApi } from '@/services/examinee-services'

import { defineAsyncComponent, ref } from 'vue'

const ExamineeForm = defineAsyncComponent(() => import('../components/examinee/ExamineeForm.vue'))
const ExamineeList = defineAsyncComponent(() => import('../components/examinee/ExamineeList.vue'))

const store = useStore()
const { setToast } = useToast()
const { setAlert } = useAlert()
const { insertExaminee, updateExaminee, deleteExaminee } = ExamineeApi()
const data = ref({})
const isUpdate = ref(false)

/* Examinee */
const submitExaminee = async (response) => {
  try {
    if (!isUpdate.value) {
      const res = await insertExaminee(response)
      store.dispatch('examinee/addExaminee', res.data.data)
      setToast('success', res.data.message)
    } else {
      const updateData = {
        first_name: response.first_name,
        middle_name: response.middle_name,
        last_name: response.last_name
      }
      const res = await updateExaminee(updateData, response.examinee_id)
      store.dispatch('examinee/editExaminee', response)
      setToast('success', res.data.message)
    }
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isUpdate.value = false
  }
}

const editExaminee = (response) => {
  data.value = response
  isUpdate.value = true
}
const removeExaminee = (response) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteExaminee(response.examinee_id)
          store.dispatch('examinee/removeExaminee', response)
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
