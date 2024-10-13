<template>
  <BaseTable :data="questionList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block--with-border align-top border">{{ index + 1 }}</td>
      <td class="table__block--with-border max-w-xs  whitespace-normal  px-5">
        <p class="font-bold text-warning">{{ item.question }}</p>
        <div class="grid grid-cols-12 gap-2 mt-2">
          <div class="xl:col-span-4 lg:col-span-4 md:col-span-12" v-for="(choices) in item.choices"
            :key="choices.choices_id">
            <p :class="{ 'text-success': choices.status }">{{ choices.description }}</p>
          </div>
        </div>

      </td>
      <td class="table__block--with-border align-top">
        <base-button type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
          <i-bx-edit></i-bx-edit>
        </base-button>
        <base-button type="button" class="bg-danger" size="small" @click="handleDelete(item)">
          <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
        </base-button>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { useConvertLetter } from '@/composables/useConvertLetter';

const route = useRoute()
const store = useStore()
const { convertToLetter } = useConvertLetter();
const emits = defineEmits({
  update: Object,
  delete: Object
})
const header = ref(['#', 'Questions', 'Action'])
const handleUpdate = (val) => {
  emits('update', val)
}
const handleDelete = (val) => {
  emits('delete', val)
}


const questionData = computed(() => store.getters['questChoices/getQuestChoice'])
const questionList = computed(() => {
  return questionData.value.map((item) => {
    return {
      question_id: item.question_id,
      question: item.question,
      choices: item.Choices.map((choice, index) => ({
        choices_id: choice.choices_id,
        description: convertToLetter(index) + ').' + choice.description,
        status: choice.status
      }))
    }
  })

})



const fetchQuestChoice = async () => {
  const id = route.params.id;
  try {
    await store.dispatch('questChoices/fetchQuestChoice', id)
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

onMounted(() => {
  fetchQuestChoice()
})
</script>
