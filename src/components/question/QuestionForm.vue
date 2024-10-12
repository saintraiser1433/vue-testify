<template>
  <form @submit.prevent="dataQuestion">
    <div class="mb-2">
      <label for="course">Exam Title:</label>
      <base-input type="text" id="course" v-model="formExam.exam_title" />
    </div>
    <div class="mb-2">
      <label for="question">Exam Description:</label>
      <base-text-area id="question" v-model="formExam.description" />
    </div>
    <div class="flex mb-2 border-b border-colorBorder pb-2">
      <base-button class="ml-auto" variant="success" isRounded="true" size="small">
        <div class="flex justify-between items-center gap-2">
          <i-mingcute-plus-fill></i-mingcute-plus-fill>
          <span>Add Questions</span>
        </div>
      </base-button>
    </div>
    <!-- mock -->

    <div
      class="flex flex-col gap-1 mb-4 py-1"
      v-for="(choices, index) in choicesList"
      :key="choices"
    >
      <div class="flex items-center justify-between mb-1">
        <label for="question">Choices {{ index }}:</label>
        <div class="flex gap-1">
          <base-button class="ml-auto" variant="danger" isRounded="true" size="small">
            <i-tabler-trash></i-tabler-trash>
          </base-button>
        </div>
      </div>
      <base-text-area id="question" v-model="formExam.description" />
    </div>

    <base-button type="submit" variant="primary" size="block">{{
      isUpdate ? 'Update' : 'Submit'
    }}</base-button>
    <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset"
      >Reset</base-button
    >
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

const choicesList = ref([])

const { isUpdate, formData } = toRefs(props)

const formExam = ref({
  exam_title: '',
  description: ''
})

const addQuestion = () => {}

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

const submitQuestion = () => {
  emits('dataQuestion', { ...formExam.value })
  formExam.value.exam_title = ''
  formExam.value.description = ''
}
</script>
