<template>
  <form @submit.prevent="submitCourse">
    <div class="mb-2">
      <label for="course">Course:</label>
      <base-input type="text" id="course" v-model="formCourse.description" required />
    </div>
    <div class="mb-2">
      <label for="score">Score Attained:</label>
      <base-input type="number" id="score" v-model.number="formCourse.score" required />
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

const formCourse = ref({
  description: '',
  score: null
})

const reset = () => {
  emits('reset')
}

const submitCourse = () => {
  emits('dataCourse', { ...formCourse.value })
}

watch(
  formData,
  (newData) => {
    if (newData && JSON.stringify(formCourse.value) !== JSON.stringify(formData)) {
      formCourse.value = { ...newData }
    }
  },
  { deep: true }
)
</script>
