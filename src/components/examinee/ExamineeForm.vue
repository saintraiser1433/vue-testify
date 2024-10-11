<template>
  <form @submit.prevent="submitExaminee">
    <div class="mb-2">
      <label for="firstname">First Name</label>
      <base-input type="text" id="firstname" v-model="formExaminee.first_name" />
    </div>
    <div class="mb-2">
      <label for="middlename">Middle Name</label>
      <base-input type="text" id="middlename" v-model="formExaminee.middle_name" />
    </div>
    <div class="mb-2">
      <label for="lastname">Last Name</label>
      <base-input type="text" id="lastname" v-model="formExaminee.last_name" />
    </div>

    <base-button type="submit" class="bg-primary">{{ isUpdate ? 'Update' : 'Submit' }}</base-button>
    <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset"
      >Reset</base-button
    >
  </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'
import { customAlphabet } from 'nanoid'
const emits = defineEmits(['dataExaminee', 'reset'])

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object
  }
})

const { isUpdate, formData } = toRefs(props)

const formExaminee = ref({
  first_name: '',
  middle_name: '',
  last_name: ''
})

const generateRandomString = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const nanoid = customAlphabet(alphabet, 8)
  return nanoid()
}

watch(
  formData,
  (newData) => {
    if (newData && JSON.stringify(formExaminee.value) !== JSON.stringify(newData)) {
      formExaminee.value = { ...newData }
    }
  },
  { deep: true }
)

const reset = () => {
  emits('reset')
}

// Emit form data on submit
const submitExaminee = () => {
  const data = {
    username: generateRandomString(),
    password: 'user'
  }
  emits('dataExaminee', { ...formExaminee.value, ...data })
  formExaminee.value.first_name = ''
  formExaminee.value.middle_name = ''
  formExaminee.value.last_name = ''
}
</script>
