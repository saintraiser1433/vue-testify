<template>
  <form @submit.prevent="submitCourse">
    <div class="mb-2">
      <label for="course">Course:</label>
      <base-input type="text" id="course" v-model="formCourse.description" />
    </div>
    <div class="mb-2">
      <label for="score">Score Attained:</label>
      <base-input type="number" id="score" v-model.number="formCourse.score" />
    </div>

    <base-button type="submit" class="bg-primary">{{ isUpdate ? 'Update' : 'Submit' }}</base-button>
    <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset"
      >Reset</base-button
    >
  </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'

const emits = defineEmits(['dataCourse', 'reset'])

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

// Reactive form object
const formCourse = ref({
  description: '',
  score: null
})

watch(
  formData,
  (newData) => {
    if (newData && JSON.stringify(formCourse.value) !== JSON.stringify(formData)) {
      formCourse.value = { ...newData }
    }
  },
  { deep: true }
)

const reset = () => {
  emits('reset')
}

// Emit form data on submit
const submitCourse = () => {
  emits('dataCourse', { ...formCourse.value })
  formCourse.value.description = ''
  formCourse.value.score = null
}
</script>
