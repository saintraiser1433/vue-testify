<template>
  <base-modal :open="isOpen" size="large" title="Add Assignee" @close="closeModal">
    <template #default>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
          <assign-form :courseList="coursesList" :deansId="deansId" :formData="data" @dataAssign="submitAssignCourse"
            @reset="resetInstance"></assign-form>
        </div>
        <div class="col-span-12 lg:col-span-8 xl:col-span-8">
          <assign-list :assignData="assignDeanCourses" @delete="removeDeansCourse"></assign-list>
        </div>
      </div>
    </template>
  </base-modal>


  <div class="grid grid-cols-5 gap-2">
    <div class="col-span-5 lg:col-span-2 xl:col-span-2">
      <BaseCard title="Deans Information">
        <template #default>
          <deans-form :isUpdate="isUpdate" :formData="data" :departmentData="departmentData" @dataDeans="submitDeans"
            @reset="resetInstance"></deans-form>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-3">
      <BaseCard title="List of Dean's">
        <template #default>
          <deans-list :deansData="deansData" :departmentData="departmentData" @assign="assignDeans"
            @update="editDeans"></deans-list>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert'
import { useToast } from '@/composables/useToast'
import { defineAsyncComponent, ref, onMounted, computed } from 'vue'
import { DeansApi } from '@/services/deans-services'
import { DepartmentApi } from '@/services/department-services'
import { CourseApi } from '@/services/course-services'
const DeansForm = defineAsyncComponent(() => import('../components/deans/DeansForm.vue'))
const DeansList = defineAsyncComponent(() => import('../components/deans/DeansList.vue'))
const AssignForm = defineAsyncComponent(() => import('../components/deans/DeansAssignForm.vue'))
const AssignList = defineAsyncComponent(() => import('../components/deans/DeansAssignList.vue'))
const { setToast } = useToast()
const { setAlert } = useAlert()
const { getAssignDeanCourse,
  getAllDeans,
  insertDeans,
  updateDeans,
  insertAssignDeansCourse,
  deleteAssignDeansCourse
} = DeansApi()
const { getCourse } = CourseApi()

/* Add Deans */

const data = ref({})
const deansData = ref([])
const submitDeans = async (response) => {
  try {
    if (!isUpdate.value) {
      const createDeans = await insertDeans(response)
      deansData.value.unshift(createDeans.data.assignDeans)
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

const fetchDeans = async () => {
  try {
    const response = await getAllDeans()
    deansData.value = response.data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}

//end

//assigning dean
const assignDeanCourses = ref([])
const courseSelection = ref([]);
const deansId = ref(null);
const assignDeans = (id) => {
  deansId.value = id
  fetchAssignDeansCourse(id)
  isOpen.value = true
}

const coursesList = computed(() => {
  return courseSelection.value.filter((item) => {
    return !assignDeanCourses.value.some((assign) => assign.course_id === item.course_id);
  }).map((mapItems) => ({
    id: mapItems.course_id,
    value: mapItems.description
  }))
})

const submitAssignCourse = async (response) => {
  try {
    const createAssign = await insertAssignDeansCourse(response)
    const data = {
      deans_id: createAssign.data.assignDeans.deans_id,
      course_id: createAssign.data.assignDeans.course_id,
      description: createAssign.data.assignDeans.course.description,
    }
    assignDeanCourses.value.unshift(data)
    setToast('success', createAssign.data.message)
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occured')
  }
}

const removeDeansCourse = (response) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(async (result) => {
    if (result.isConfirmed) {
      try {
        const deansId = response.deans_id;
        const courseId = response.course_id;
        const res = await deleteAssignDeansCourse(deansId, courseId);
        const index = assignDeanCourses.value.findIndex((item) => item.deans_id === deansId && item.course_id === courseId);
        assignDeanCourses.value.splice(index, 1);
        setToast('success', res.data.message);
      } catch (err) {
        setToast('error', err.response.data.error || 'An error occured');
      }

    }
  })
}

const fetchCourse = async () => {
  try {
    const response = await getCourse();
    courseSelection.value = response.data;
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}

const fetchAssignDeansCourse = async (id) => {
  try {
    const response = await getAssignDeanCourse(id)
    const data = response.data.map((item) => ({
      deans_id: item.deans_id,
      course_id: item.course_id,
      description: item.course.description
    }))
    assignDeanCourses.value = data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}

//end
//department
const { getDepartment } = DepartmentApi()
const departmentData = ref([])
const fetchDepartment = async () => {
  try {
    const response = await getDepartment()
    departmentData.value = response.data
  } catch (err) {
    setToast('error', err.response.data.error || 'An error occurred')
  }
}


//util
const isUpdate = ref(false)
const isOpen = ref(false)
const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}

const closeModal = (response) => {
  isOpen.value = false
}

//lifecycle
onMounted(() => {
  fetchDeans()
  fetchDepartment()
  fetchCourse()
})
</script>
