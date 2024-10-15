<template>
  <form @submit.prevent="submitQuestionChoices">
    <div class="mb-2">
      <label for="exam">Exam Title:</label>
      <base-input class="capitalize" type="text" id="exam" :disabled="true" :value="examTitle" />
    </div>
    <div class="mb-2">
      <label for="question">Question:</label>
      <base-text-area id="question" v-model="question" />
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
    <base-button
      type="button"
      v-if="isUpdate"
      class="mb-2"
      variant="danger"
      size="block"
      @click="reset"
      >Reset</base-button
    >
    <base-button type="submit" variant="primary" size="block">{{
      isUpdate ? 'Update' : 'Submit'
    }}</base-button>
  </form>
</template>

<script setup>
import { toRefs, ref, watch, computed } from 'vue'
import { useConvertLetter } from '@/composables/useConvertLetter'
import { useRoute } from 'vue-router'
const { convertToLetter } = useConvertLetter()
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
const question = ref('')
const questionId = ref(null)
const { isUpdate, formData } = toRefs(props)

const examTitle = computed(() => route.meta.examTitle)

const addChoices = () => {
  choicesList.value.push({ description: '', status: false })
}

const removeChoices = async (index) => {
  if (index !== -1) {
    choicesList.value.splice(index, 1)
  }
}

const submitQuestionChoices = () => {
  let data
  if (!isUpdate.value) {
    data = {
      question: question.value,
      exam_id: route.params.examId,
      choices: choicesList.value.map((choice) => {
        return {
          description: choice.description,
          status: choice.status
        }
      })
    }
  } else {
    data = {
      question: question.value,
      question_id: questionId.value,
      choices: choicesList.value.map((choice) => {
        return {
          choices_id: choice.choices_id,
          description: choice.description,
          status: choice.status
        }
      })
    }
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
      question.value = newData.question
      questionId.value = newData.question_id
      choicesList.value = choicesData
    }
  },
  { deep: true }
)

const reset = () => {
  question.value = ''
  choicesList.value = []
  questionId.value = null
  emits('reset')
}
</script>
