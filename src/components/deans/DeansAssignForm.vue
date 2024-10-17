<template>
  <form @submit.prevent="submitCourse">
    <div class="py-5">
      <label for="course">Course:</label>
      <base-selector class="text-base" v-model.number="courseId" :data="courseList"></base-selector>
    </div>
    <div class="border-t border-colorBorder pt-2">
      <base-button type="submit" variant="primary" size="sm">Submit</base-button>
    </div>
  </form>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  deansId: Number,
  courseList: Object
})
const { deansId, courseList } = toRefs(props)

const emits = defineEmits(['dataAssign', 'reset'])
const courseId = ref(null)

const submitCourse = () => {
  const data = {
    deans_id: deansId.value,
    course_id: courseId.value
  }
  emits('dataAssign', data)
  courseId.value = null
}
</script>
