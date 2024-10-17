<template>
  <BaseLoader :isLoading="isLoading"></BaseLoader>
  <div class="grid grid-cols-5 gap-2">
    <div class="col-span-5 lg:col-span-2 xl:col-span-2">
      <BaseCard title="Department Information">
        <template #default>
          <DepartmentForm :isUpdate="isUpdate" :formData="data" @dataDepartment="submitDepartment"
            @reset="resetInstance"></DepartmentForm>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-3">
      <BaseCard title="List of Department's">
        <template #default>
          <DepartmentList :departmentData="departmentData" @update="editDepartment" @delete="removeDepartment">
          </DepartmentList>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { DepartmentApi } from '@/services/department-services'
const DepartmentForm = defineAsyncComponent(() =>
  import('../components/department/DepartmentForm.vue')
)
const DepartmentList = defineAsyncComponent(() =>
  import('../components/department/DepartmentList.vue')
)
const { getDepartment, insertDepartment, updateDepartment, deleteDepartment } = DepartmentApi()
const { setToast } = useToast()
const { setAlert } = useAlert()
const data = ref({})
const isUpdate = ref(false)
const isLoading = ref(false);
const departmentData = ref([])
/* Department */
const submitDepartment = async (response) => {
  try {
    isLoading.value = true
    if (!isUpdate.value) {
      const createdDepartment = await insertDepartment(response)
      departmentData.value.unshift(createdDepartment.data.data)
      setToast('success', createdDepartment.data.message)
    } else {
      const updatedDepartment = await updateDepartment(response, response.department_id)
      const index = departmentData.value.findIndex(
        (item) => item.department_id === response.department_id
      )
      departmentData.value[index] = { ...departmentData.value[index], ...response }
      setToast('success', updatedDepartment.data.message)
    }
    resetInstance()
  } catch (err) {
    setToast('error', err.response.data.error)
  } finally {
    isLoading.value = false
  }
}

const editDepartment = (response) => {
  data.value = response
  isUpdate.value = true
}
const removeDepartment = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          isLoading.value = true
          const res = await deleteDepartment(id)
          const index = departmentData.value.findIndex((item) => item.department_id === id)
          departmentData.value.splice(index, 1)
          setToast('success', res.data.message)
        } catch (e) {
          setToast('error', e.response.data.error || 'An error occurred')
        } finally {
          isLoading.value = false
        }
      }
    }
  )
}

const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}

const fetchDepartment = async () => {
  try {
    isLoading.value = true
    const response = await getDepartment()
    departmentData.value = response.data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDepartment()
})
</script>
