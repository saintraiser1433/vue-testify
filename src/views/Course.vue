<template>
  <div class="grid grid-cols-5 gap-2">
    <div class="col-span-5 lg:col-span-2 xl:col-span-2">
      <BaseCard title="Course Information">
        <template #default>
          <course-form :isUpdate="isUpdate" :formData="data" @dataCourse="submitCourse"
            @reset="resetInstance"></course-form>
        </template>
      </BaseCard>
    </div>
    <div class="col-span-5 lg:col-span-3 xl:col-span-3">
      <BaseCard title="List of Course's">
        <!-- :formData="editExaminee" -->
        <template #default>
          <course-list @update="editCourse" @delete="removeCourse"></course-list>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useToast } from '@/composables/useToast'
import { useAlert } from '@/composables/useAlert'
import { defineAsyncComponent, ref } from 'vue'
import { CourseApi } from '@/services/course-services'
const CourseForm = defineAsyncComponent(() => import('../components/course/CourseForm.vue'))
const CourseList = defineAsyncComponent(() => import('../components/course/CourseList.vue'))

const store = useStore()
const { setToast } = useToast()
const { setAlert } = useAlert()
const { insertCourse, updateCourse, deleteCourse } = CourseApi()

const data = ref({})
const isUpdate = ref(false)

/* Examinee */

const submitCourse = async (response) => {
  try {
    if (!isUpdate.value) {
      const createData = await insertCourse(response)
      store.dispatch('course/addCourse', createData.data.data)
      setToast('success', createData.data.message)
    } else {
      const updateData = {
        description: response.description,
        score: response.score
      }
      const res = await updateCourse(updateData, response.course_id)
      store.dispatch('course/editCourse', response)
      setToast('success', res.data.message || 'An error occurred')
    }
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  } finally {
    isUpdate.value = false
  }
}

const editCourse = (response) => {
  data.value = response
  isUpdate.value = true
}
const removeCourse = (response) => {
  setAlert('warning', 'Are you sure you want to delete?', null, 'Confirm delete').then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCourse(response.course_id)
          store.dispatch('course/removeCourse', response)
          setToast('success', 'Successfully deleted')
        } catch (e) {
          setToast('error', e.response.data.message || 'An error occurred')
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
