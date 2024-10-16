<template>
  <BaseTable :data="deansList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.fullname }}</td>
      <td class="table__block">{{ item.department_name }}</td>
      <td class="table__block">{{ item.username }}</td>
      <td class="table__block">
        <base-badge :variant="item.status ? 'success' : 'danger'">
          {{ item.status ? 'Active' : 'Inactive' }}
        </base-badge>
      </td>
      <td class="table__block">
        <base-button type="button" variant="primary" size="small" class="mr-1" @click="assignDeans(item.deans_id)">
          <i-gridicons-add-outline></i-gridicons-add-outline>
        </base-button>
        <base-button type="button" variant="success" size="small" class="mr-1" @click="handleUpdate(item)">
          <i-bx-edit></i-bx-edit>
        </base-button>
        <!-- <base-button
          type="button"
          variant="secondary"
          size="small"
          class="mr-1"
          @click="handleUpdate(item.deans_id)"
        >
          <i-bx-reset></i-bx-reset>
        </base-button> -->
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
const header = ref(['#', 'Fullname', 'Department', 'Username', 'Status', 'Action'])
const emits = defineEmits(['update', 'delete', 'assign'])
const props = defineProps({
  deansData: Object,
  departmentData: Object
})

const { deansData, departmentData } = toRefs(props)

const deansList = computed(() => {
  return deansData.value.map((item) => {
    const fullname = computed(
      () => item.first_name + ' ' + item.last_name + ' ' + item.middle_name[0] + '.'
    )
    const department = departmentData.value.find(
      (dept) => dept.department_id === item.department_id
    )
    return {
      deans_id: item.deans_id,
      fullname: fullname,
      first_name: item.first_name,
      last_name: item.last_name,
      middle_name: item.middle_name,
      department_name: department ? department.department_name : 'N/A',
      department_id: item.department_id,
      username: item.username,
      status: item.status
    }
  })
})

const assignDeans = (id) => {
  emits('assign', id)
}

const handleUpdate = (item) => {
  emits('update', item)
}

</script>
