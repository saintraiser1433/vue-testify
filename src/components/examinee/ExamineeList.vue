<template>
  <BaseTable :data="examineeList" :header="header">
    <template #row="{ item, index }">
      <td class="table__block">{{ index + 1 }}</td>
      <td class="table__block">{{ item.fullname }}</td>
      <td class="table__block">{{ item.username }}</td>
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
import { computed, ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import { useStore } from 'vuex'
const { setToast } = useToast()
const store = useStore()

const emits = defineEmits({
  update: Object,
  delete: Object
})

const header = ref(['#', 'Fullname', 'Username', 'Action'])

const data = computed(() => store.getters['examinee/getExaminee'])
const examineeList = computed(() => {
  return data.value.map((item) => {
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

const fetchExaminees = async () => {
  try {
    await store.dispatch('examinee/fetchExaminees')
  } catch (e) {
    setToast('error', e.response.data.error || 'An error occurred')
  }
}

onMounted(() => {
  fetchExaminees()
})

const handleUpdate = (val) => {
  emits('update', val)
}
const handleDelete = (val) => {
  emits('delete', val)
}
</script>
