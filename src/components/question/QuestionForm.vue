<template>
  <form @submit.prevent="submitQuestion">
    <div class="mb-2">
      <label for="course">Exam Title:</label>
      <base-input type="text" id="course" />
    </div>
    <div class="mb-2">
      <label for="question">Exam Description:</label>
      <base-text-area id="question" v-model="formQuestion.question" />
    </div>
    <div class="flex mb-2 border-b border-colorBorder pb-2">
      <base-button
        type="button"
        class="ml-auto"
        variant="success"
        :isRounded="false"
        size="small"
        @click="addChoices"
      >
        <div class="flex justify-between items-center gap-2">
          <i-mingcute-plus-fill></i-mingcute-plus-fill>
          <span>Add Choices</span>
        </div>
      </base-button>
    </div>
    <div class="flex flex-col gap-1 mb-4 py-1" v-for="(choices, index) in choicesList" :key="index">
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center gap-2">
          <label :for="'choice_' + index">Choices {{ convertToLetter(index) }}:</label>
          <base-check-box v-model="choices.status"></base-check-box>
        </div>

        <div class="flex gap-1">
          <base-button
            type="button"
            class="ml-auto h-7 w-7 inline-flex items-center justify-center"
            @click="removeChoices(index)"
            variant="danger"
            :isRounded="true"
            size="small"
          >
            <i-tabler-trash class="flex-shrink-0"></i-tabler-trash>
          </base-button>
        </div>
      </div>
      <base-text-area :id="'choice_' + index" v-model="choices.description" />
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
import { useConvertLetter } from '@/composables/useConvertLetter'
import { useRoute } from 'vue-router'
import { ChoicesApi } from '@/services/choices-services'
const { convertToLetter } = useConvertLetter()
const { deleteChoices } = ChoicesApi()
const emits = defineEmits(['dataQuestChoice', 'reset'])
const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object
  }
})

const route = useRoute()
const choicesList = ref([])
const questionId = ref(null)
const { isUpdate, formData } = toRefs(props)
const formQuestion = ref({
  question: ''
})

const addChoices = () => {
  choicesList.value.push({ description: '', status: false })
}

const removeChoices = async (index) => {
  if (isUpdate.value) {
    const id = choicesList.value[index].choices_id
  }
  if (index !== -1) {
    choicesList.value.splice(index, 1)
  }
}

const submitQuestion = () => {
  const data = {
    ...formQuestion.value,
    exam_id: route.params.id,
    question_id: isUpdate.value ? questionId.value : 0,
    choices: choicesList.value.map((choice) => ({
      choices_id: isUpdate.value ? choice.choices_id : 0,
      description: choice.description,
      status: choice.status
    }))
  }

  emits('dataQuestChoice', data)
}

//watchers

watch(
  formData,
  (newData) => {
    if (newData) {
      const choicesData = (newData.choices || []).map((item) => ({
        choices_id: item.choices_id,
        description: item.choice_name,
        status: item.status
      }))
      formQuestion.value = { question: newData.question }
      questionId.value = newData.question_id
      choicesList.value = choicesData
    }
  },
  { deep: true }
)

const reset = () => {
  emits('reset')
}
</script>
