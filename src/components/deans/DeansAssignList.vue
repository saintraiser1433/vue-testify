<template>
  <BaseTable :data="deansList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.course }}</td>
      <td class="table__block">
        <base-button type="button" size="small" variant="danger" @click="handleDelete(item)">
          <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
        </base-button>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const emits = defineEmits(['delete'])
const header = ref(['#', 'Course Assigned', 'Action'])
const props = defineProps({
  courseData: Object
})

const handleDelete = (item) => {
  emits('delete', item.id)
}
</script>
