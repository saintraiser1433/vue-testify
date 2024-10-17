<template>
  <form @submit.prevent="submitExaminee">
    <div class="mb-2">
      <label for="firstname">First Name</label>
      <base-input type="text" id="firstname" v-model="formExaminee.first_name" required />
    </div>
    <div class="mb-2">
      <label for="middlename">Middle Name</label>
      <base-input type="text" id="middlename" v-model="formExaminee.middle_name" required />
    </div>
    <div class="mb-2">
      <label for="lastname">Last Name</label>
      <base-input type="text" id="lastname" v-model="formExaminee.last_name" required />
    </div>
    <div class="border-t border-colorBorder pt-2">
      <base-button type="submit" class="bg-primary">
        {{ isUpdate ? 'Update' : 'Submit' }}
      </base-button>
      <base-button type="button" v-if="isUpdate" class="bg-danger ml-2" @click="reset">
        Reset
      </base-button>
    </div>
  </form>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue'
import { useGenerateRandom } from '@/composables/useGenerateRandom'
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
const { generateRandomString } = useGenerateRandom(8)
const { isUpdate, formData } = toRefs(props)

const formExaminee = ref({
  first_name: '',
  middle_name: '',
  last_name: ''
})

const submitExaminee = () => {
  let data
  if (!isUpdate.value) {
    data = {
      ...formExaminee.value,
      username: generateRandomString(),
      password: generateRandomString()
    }
  } else {
    data = {
      ...formExaminee.value
    }
  }
  emits('dataExaminee', data)
}

const reset = () => {
  emits('reset')
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
</script>
