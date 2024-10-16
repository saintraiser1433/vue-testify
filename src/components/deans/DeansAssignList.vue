<template>
  <BaseTable :data="assignData" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.description }}</td>
      <td class="table__block">
        <base-button type="button" size="small" variant="danger" @click="handleDelete(item)">
          <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
        </base-button>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const emits = defineEmits(['delete'])
const header = ref(['#', 'Course Assigned', 'Action'])
const props = defineProps({
  assignData: Object
});

const { assignData } = toRefs(props);



const handleDelete = (item) => {
  emits('delete', item)
}
</script>
