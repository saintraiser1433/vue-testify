<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5 lg:col-span-1">
      <BaseCard title="Course Information">
        <template #default>
          <course-form :isUpdate="isUpdate" :formData="data" @dataCourse="submitCourse"
            @reset="resetInstance"></course-form>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-4">
      <BaseCard title="List of Course's">
        <!-- :formData="editExaminee" -->
        <template #default>
          <course-list :courseData="courseData" @update="editCourse" @delete="removeCourse"></course-list>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
import { useAlert } from '@/composables/useAlert'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { CourseApi } from '@/services/course-services'
import CourseForm from '@/components/course/CourseForm.vue';
import CourseList from '@/components/course/CourseList.vue';
// const CourseForm = defineAsyncComponent(() => import('../components/course/CourseForm.vue'))
// const CourseList = defineAsyncComponent(() => import('../components/course/CourseList.vue'))

const { setToast } = useToast()
const { setAlert } = useAlert()
const { getCourse, insertCourse, updateCourse, deleteCourse } = CourseApi()

const data = ref({})
const isUpdate = ref(false)
const isLoading = ref(false)
const courseData = ref([])
/* Examinee */

const submitCourse = async (response) => {
  try {
    isLoading.value = true
    if (!isUpdate.value) {
      const createData = await insertCourse(response)
      courseData.value.unshift(createData.data.course)
      setToast('success', createData.data.message)
    } else {
      const updateData = await updateCourse(response, response.course_id)
      const index = courseData.value.findIndex((item) => item.course_id === response.course_id)
      courseData.value[index] = { ...courseData.value[index], ...response }
      setToast('success', updateData.data.message)
    }
    resetInstance()
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}

const editCourse = (response) => {
  data.value = response
  isUpdate.value = true
}
const removeCourse = (id) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          isLoading.value = true
          const deleteResult = await deleteCourse(id)
          const index = courseData.value.findIndex((item) => item.course_id === id)
          if (index !== -1) {
            courseData.value.splice(index, 1)
            setToast('success', deleteResult.data.message)
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

const resetInstance = () => {
  isUpdate.value = false
  data.value = {}
}

const fetchCourse = async () => {
  try {
    isLoading.value = true
    const response = await getCourse()
    courseData.value = response.data
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCourse()
})
</script>
