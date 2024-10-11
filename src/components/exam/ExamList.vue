<template>
  <BaseTable :data="examList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.exam_title }}</td>
      <td class="table__block">{{ item.description }}</td>
      <td class="table__block text-center">{{ item.time_limit }}</td>
      <td class="table__block text-center">{{ item.question_limit }}</td>
      <td class="table__block">
        <base-button type="button" class="bg-success mr-1" @click="handleUpdate(item)">
          <i-bx-edit></i-bx-edit>
        </base-button>
        <base-button type="button" class="bg-danger" @click="handleDelete(item)">
          <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
        </base-button>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const emits = defineEmits({
  update: Object,
  delete: Object
})
const header = ref(['#', 'Exam Title', 'Description', 'Time Limit', 'Question Limit', 'Action'])
const handleUpdate = (val) => {
  emits('update', val)
}
const handleDelete = (val) => {
  emits('delete', val)
}

const examList = computed(() => store.getters['exam/getExam'])
const fetchExam = async () => {
  try {
    await store.dispatch('exam/fetchExam')
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

onMounted(() => {
  fetchExam()
})
</script>
