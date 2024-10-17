<template>
  <form @submit.prevent="submitExam">
    <div class="mb-2">
      <label for="course">Exam Title:</label>
      <base-input type="text" id="course" v-model="formExam.exam_title" required />
    </div>
    <div class="mb-2">
      <label for="course">Exam Description:</label>
      <base-input type="text" id="course" v-model="formExam.description" required />
    </div>
    <div class="mb-2">
      <label for="score">Time Limit:</label>
      <base-input type="number" id="score" v-model.number="formExam.time_limit" required />
    </div>
    <div class="mb-2">
      <label for="score">Question Limit:</label>
      <base-input type="number" id="score" v-model.number="formExam.question_limit" required />
    </div>
    <div class="border-t border-colorBorder pt-2">
      <base-button type="submit" class="bg-primary">{{
        isUpdate ? 'Update' : 'Submit'
      }}</base-button>
      <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset"
        >Reset</base-button
      >
    </div>
  </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'

const emits = defineEmits(['dataExam', 'reset'])

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object
  }
})

const { isUpdate, formData } = toRefs(props)

const formExam = ref({
  exam_title: '',
  description: '',
  time_limit: null,
  question_limit: null
})

watch(
  formData,
  (newData) => {
    if (newData && JSON.stringify(formExam.value) !== JSON.stringify(formData)) {
      formExam.value = { ...newData }
    }
  },
  { deep: true }
)

const reset = () => {
  emits('reset')
}

const submitExam = () => {
  emits('dataExam', { ...formExam.value })
}
</script>
