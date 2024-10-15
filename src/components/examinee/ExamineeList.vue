<template>
  <BaseTable :data="examineeList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.fullname }}</td>
      <td class="table__block">{{ item.username }}</td>
      <td class="table__block">
        <base-button type="button" class="bg-success mr-1" size="small" @click="handleUpdate(item)">
          <i-bx-edit></i-bx-edit>
        </base-button>
        <base-button
          type="button"
          class="bg-danger"
          size="small"
          @click="handleDelete(item.examinee_id)"
        >
          <i-icon-park-solid-people-delete></i-icon-park-solid-people-delete>
        </base-button>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

const emits = defineEmits({
  update: Object,
  delete: Object
})
const props = defineProps({
  examineeData: Object
})

const { examineeData } = toRefs(props)

const header = ref(['#', 'Fullname', 'Username', 'Action'])

const examineeList = computed(() => {
  return examineeData.value.map((item) => {
    const fullname = computed(
      () => item.first_name + ' ' + item.last_name + ' ' + item.middle_name[0] + '.'
    )
    return {
      examinee_id: item.examinee_id,
      fullname: fullname,
      first_name: item.first_name,
      last_name: item.last_name,
      middle_name: item.middle_name,
      username: item.username
    }
  })
})

const handleUpdate = (val) => {
  emits('update', val)
}
const handleDelete = (val) => {
  emits('delete', val)
}
</script>
