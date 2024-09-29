<template>
  <Transition name="sidebar" mode="out-in">
    <aside v-if="isToggle" class="bg-darken md:fixed md:top-0 md:h-screen md:w-60 md:px-2 md:py-5 lg:flex xl:flex z-50">
      <div class="container mx-auto">
        <div
          class="md:text-2xl md:px-2 lg:hidden xl:hidden text-3xl font-bold font-titleFont flex justify-between items-center">
          <i-mingcute-vue-fill class="text-primary" />
          <span class="flex-grow pl-2"> Testify</span>
          <button class="rounded-full hover:bg-white" @click="setSelected">
            <i-iconamoon-close-bold />
          </button>
        </div>
        <ul
          class="flex flex-col mt-4 overflow-hidden lg:mx-auto lg:mt-14 lg:p-2 lg:flex-row lg:gap-1 xl:mt-14 xl:p-2 xl:mx-auto xl:flex-row xl:gap-1 ">
          <slot></slot>
        </ul>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

/* Toggle */
const setSelected = () => {
  store.dispatch('setToggle', false)
}

const isToggle = computed(() => {
  return store.getters.getToggleState
})
</script>
