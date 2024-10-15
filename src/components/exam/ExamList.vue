<template>
  <BaseTable :data="examList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.exam_title }}</td>
      <td class="table__block max-w-xs truncate overflow-hidden whitespace-nowrap">
        {{ item.description }}
      </td>
      <td class="table__block text-center">{{ item.time_limit }}</td>
      <td class="table__block text-center">{{ item.question_limit }}</td>
      <td class="table__block">
        <base-button
          type="button"
          class="bg-info mr-1"
          size="small"
          @click="setSelect(item.exam_id)"
        >
          <i-lets-icons-question-duotone></i-lets-icons-question-duotone>
        </base-button>
        <base-button type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
          <i-bx-edit></i-bx-edit>
        </base-button>
        <base-button
          type="button"
          class="bg-danger"
          size="small"
          @click="handleDelete(item.exam_id)"
        >
          <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
        </base-button>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const emits = defineEmits({
  update: Object,
  delete: Object
})
const props = defineProps({
  examData: Object
})
const { examData } = toRefs(props)
const header = ref(['#', 'Exam Title', 'Description', 'Time Limit', 'Question Limit', 'Action'])

const setSelect = (id) => {
  router.push({ name: 'Question', params: { examId: id } })
}

const handleUpdate = (val) => {
  emits('update', val)
}
const handleDelete = (val) => {
  emits('delete', val)
}

const examList = computed(() => examData.value)
</script>
