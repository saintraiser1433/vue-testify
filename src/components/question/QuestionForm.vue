<template>
  <form @submit.prevent="submitQuestion">
    <div class="mb-2">
      <label for="course">Exam Title:</label>
      <base-input type="text" id="course" v-model="formExam.exam_title" />
    </div>
    <div class="mb-2">
      <label for="question">Exam Description:</label>
      <base-text-area id="question" v-model="formExam.description" />
    </div>
    <div class="flex mb-2 border-b border-colorBorder pb-2">
      <base-button class="ml-auto" variant="success" isRounded="true" size="small" @click="addChoices">
        <div class="flex justify-between items-center gap-2">
          <i-mingcute-plus-fill></i-mingcute-plus-fill>
          <span>Add Choices</span>
        </div>
      </base-button>
    </div>

    <div class="flex flex-col gap-1 mb-4 py-1" v-for="(choices, index) in choicesList" :key="index">
      <div class="flex items-center justify-between mb-1 ">
        <div class="flex items-center gap-2">

          <label :for="'choice_' + index">Choices {{ convertToLetter(index) }}:</label>
          <base-check-box v-model="choices.status" @change="updateChoiceState(index, choices.status)"></base-check-box>
        </div>

        <div class="flex gap-1">
          <base-button class="ml-auto h-7 w-7 inline-flex items-center justify-center" @click="removeChoices(index)"
            variant="danger" isRounded="true" size="small">
            <i-tabler-trash class="flex-shrink-0"></i-tabler-trash>
          </base-button>
        </div>
      </div>
      <base-text-area :id="'choice_' + index" v-model="choices.text" />
    </div>

    <base-button type="submit" variant="primary" size="block">{{
      isUpdate ? 'Update' : 'Submit'
    }}</base-button>
    <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">Reset</base-button>
  </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'
import { useConvertLetter } from '@/composables/useConvertLetter';
const emits = defineEmits(['dataQuestChoice', 'reset'])

const { convertToLetter } = useConvertLetter();
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
  description: ''
})


const addChoices = () => {
  choicesList.value.push({
    choices: [{ text: '' }, { checked: false }],
  })
}


const removeChoices = (index) => {
  if (index !== -1) {
    choicesList.value.splice(index, 1)
  }
}


const updateChoiceState = (index, checked) => {
  choicesList.value[index].checked = checked;
}

const submitQuestion = () => {
  const data = {
    ...formExam.value,
    choices: choicesList.value.map((choice) => ({
      text: choice.text,
      checked: choice.checked ? true : false
    }))
  }
  emits('dataQuestChoice', data)

}


//watchers

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


</script>
