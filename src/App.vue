<template>

  <AppNavBar />
  <AppMenu>
    <BaseList link="Home" title="Dashboard">
      <template #icon>
        <i-lucide-home class="text-center" />
      </template>
    </BaseList>
    <BaseList link="Examinee" title="Examinee">
      <template #icon>
        <i-fluent-hat-graduation-12-regular class="text-center" />
      </template>
    </BaseList>
    <BaseList link="Deans" title="Deans">
      <template #icon>
        <i-eos-icons-master-outlined class="text-center" />
      </template>
    </BaseList>
    <BaseList link="Department" title="Department">
      <template #icon>
        <i-gala-book class="text-center" />
      </template>
    </BaseList>
    <BaseList link="Course" title="Course">
      <template #icon>
        <i-gala-book class="text-center" />
      </template>
    </BaseList>
    <BaseList link="Exam" title="Exam">
      <template #icon>
        <i-gala-book class="text-center" />
      </template>
    </BaseList>
    <BaseList link="Rankings" title="Ranking">
      <template #icon>
        <i-ph-ranking class="text-center" />
      </template>
    </BaseList>
    <BaseCollapsible title="Settings" :children="settingsData">
      <template #icon>
        <i-ant-design-setting-outlined class="text-center" />
      </template>
    </BaseCollapsible>

  </AppMenu>
  <div class="p-5 mt-12 lg:mt-2 xl:mt-2">
    <div class="container mx-auto">
      <router-view></router-view>
    </div>
  </div>



  <teleport to="body">
    <div v-show="isToggle" class="block lg:hidden xl:hidden h-screen w-screen bg-[#171925] opacity-50 z-40 fixed top-0">
    </div>
  </teleport>



</template>


<script setup>
import { useStore } from 'vuex'
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { RouterView } from 'vue-router';
import { debounce } from 'lodash';
import { useCollapsiblesData } from './composables/useCollapsiblesData.js';

const store = useStore()
const { settingsData } = useCollapsiblesData();




/* toggle size  */
const handleResize = debounce(() => {
  const screenWidth = window.innerWidth;
  store.dispatch('setToggle', screenWidth >= 976);
}, 300);

const isToggle = computed(() => store.getters.getToggleState)

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
