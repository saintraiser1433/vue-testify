<template>
  <div class="grid grid-cols-5 gap-2">
    <div class="col-span-5 lg:col-span-2 xl:col-span-2">
      <BaseCard title="Deans Information">
        <template #default>
          <deans-form
            :isUpdate="isUpdate"
            :formData="data"
            :departmentData="departmentData"
            @dataDeans="submitDeans"
            @reset="resetInstance"
          ></deans-form>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-3">
      <BaseCard title="List of Dean's">
        <template #default>
          <deans-list
            :deansData="deansData"
            :departmentData="departmentData"
            @assign="assignDeans"
            @update="editDeans"
          ></deans-list>
        </template>
      </BaseCard>
    </div>
  </div>
  <base-modal :isToggle="isToggle" size="xxxl" title="Add Assignee" @close="closeModal">
    <template #default>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
          <assign-form
            :isUpdate="isUpdate"
            :deanId="deanId"
            :formData="data"
            @formData="submitAssignCourse"
            @reset="resetInstance"
          ></assign-form>
        </div>
        <div class="col-span-12 lg:col-span-8 xl:col-span-8">
          <assign-list @delete="deleteAssignCourse" :deanId="deanId"></assign-list>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script setup>
import { useStore } from 'vuex'
import { useAlert } from '@/composables/useAlert'
import { useToast } from '@/composables/useToast'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { DeansApi } from '@/services/deans-services'
import { DepartmentApi } from '@/services/department-services'
const DeansForm = defineAsyncComponent(() => import('../components/deans/DeansForm.vue'))
const DeansList = defineAsyncComponent(() => import('../components/deans/DeansList.vue'))
const AssignForm = defineAsyncComponent(() => import('../components/deans/DeansAssignForm.vue'))
const AssignList = defineAsyncComponent(() => import('../components/deans/DeansAssignList.vue'))
const store = useStore()
const { setToast } = useToast()
const { setAlert } = useAlert()
const { getDepartment } = DepartmentApi()
const { getAssignDeanCourse, getAllDeans, insertDeans, updateDeans } = DeansApi()
const data = ref({})
const deansData = ref([])
const departmentData = ref([])
const courseData = ref([])
const isUpdate = ref(false)
const isToggle = ref(false)

/* Deans */
const submitDeans = async (response) => {
  try {
    if (!isUpdate.value) {
      const createDeans = await insertDeans(response)
      deansData.value.unshift(createDeans.data.deans)
      setToast('success', createDeans.data.message)
    } else {
      const updatedDeans = await updateDeans(response, response.deans_id)
      const index = deansData.value.findIndex((i) => i.deans_id === response.deans_id)
      deansData.value[index] = { ...deansData.value[index], ...response }
      setToast('success', updatedDeans.data.message)
      isUpdate.value = false
    }
    resetInstance()
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occured')
  }
}

// const submitAssignDeans = (response) => {
//   if (!isUpdate.value) {
//     setToast('success', 'Successfully submitted')
//   } else {
//     // store.dispatch('deans/editDeans', response)
//     setToast('success', 'Successfully updated')
//   }
//   isUpdate.value = false
// }

const assignDeans = (id) => {
  fetchAssignDeans(id)
  isToggle.value = true
}

const removeDean = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deans/removeDeans', response)
      setToast('success', 'Successfully deleted')
    }
  })
}

const editDeans = (response) => {
  data.value = {
    deans_id: response.deans_id,
    first_name: response.first_name,
    last_name: response.last_name,
    middle_name: response.middle_name,
    department_id: response.department_id,
    status: response.status
  }
  isUpdate.value = true
}
const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}

const closeModal = (response) => {
  isToggle.value = false
}

const fetchDeans = async () => {
  try {
    const response = await getAllDeans()
    deansData.value = response.data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}

const fetchDepartment = async () => {
  try {
    const response = await getDepartment()
    departmentData.value = response.data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}

const fetchAssignDeans = async (id) => {
  try {
    const response = await getAssignDeanCourse(id)
    courseData.value = response.data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}

onMounted(() => {
  fetchDeans()
  fetchDepartment()
})
</script>
