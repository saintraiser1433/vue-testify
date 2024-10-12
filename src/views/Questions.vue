<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-4 xl:col-span-4">
      <base-card title="Question Information">
        <question-form> </question-form>
      </base-card>
    </div>
    <div class="col-span-12 lg:col-span-4 xl:col-span-8">
      <base-card title="Question Information">
        <question-list></question-list>
      </base-card>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const QuestionForm = defineAsyncComponent(() => import('@/components/question/QuestionForm.vue'))
const QuestionList = defineAsyncComponent(() => import('@/components/question/QuestionList.vue'))
</script>