<template>
  <form @submit.prevent="submitDeans">
    <div class="mb-3">
      <label for="firstname">First Name</label>
      <base-input type="text" id="firstname" v-model="formDeans.first_name" required />
    </div>
    <div class="mb-3">
      <label for="middlename">Middle Name</label>
      <base-input type="text" id="middlename" v-model="formDeans.middle_name" required />
    </div>
    <div class="mb-3">
      <label for="lastname">Last Name</label>
      <base-input type="text" id="lastname" v-model="formDeans.last_name" required />
    </div>
    <div class="mb-3">
      <label for="lastname">Department</label>
      <base-selector :data="departmentList" v-model.number="formDeans.department_id" />
    </div>
    <div class="mb-3 flex gap-2 items-center">
      <label for="status">Status:</label>
      <base-switch v-model="formDeans.status"></base-switch>
    </div>
    <div class="border-t border-colorBorder pt-2">
      <base-button type="submit" class="bg-primary">{{
        isUpdate ? 'Update' : 'Submit'
      }}</base-button>
      <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset"
        >Reset</base-button
      >
    </div>
  </form>
</template>

<script setup>
import { toRefs, ref, watch, computed } from 'vue'
import { useGenerateRandom } from '@/composables/useGenerateRandom'
const emits = defineEmits(['dataDeans', 'reset'])
const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object
  },
  departmentData: {
    type: Object
  }
})
const { generateRandomString } = useGenerateRandom(8)
const { isUpdate, formData, departmentData } = toRefs(props)

const formDeans = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  department_id: null,
  status: true
})

const departmentList = computed(() => {
  return departmentData.value
    .filter((item) => item.status)
    .map((i) => {
      return {
        id: i.department_id,
        value: i.department_name
      }
    })
})

const submitDeans = () => {
  let data
  if (!isUpdate.value) {
    data = {
      ...formDeans.value,
      username: generateRandomString(),
      password: generateRandomString()
    }
  } else {
    data = {
      ...formDeans.value
    }
  }

  emits('dataDeans', data)
}

const reset = () => {
  emits('reset')
}

watch(
  formData,
  (newData) => {
    if (newData) {
      formDeans.value = { ...newData }
    }
  },
  { deep: true }
)
</script>
