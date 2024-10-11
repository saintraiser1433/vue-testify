<template>
  <BaseTable :data="courseList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block max-w-xs truncate overflow-hidden">{{ item.description }}</td>
      <td class="table__block">{{ item.score }}</td>
      <td class="table__block">
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
const store = useStore()

const emits = defineEmits({
  update: Object,
  delete: Object
})
const header = ref(['#', 'Course', 'Score Attained', 'Action'])
const handleUpdate = (val) => {
  emits('update', val)
}
const handleDelete = (val) => {
  emits('delete', val)
}

const courseList = computed(() => store.getters['course/getCourse'])
const fetchExaminee = async () => {
  try {
    await store.dispatch('course/fetchCourse')
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

onMounted(() => {
  fetchExaminee()
})
</script>
