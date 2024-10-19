<template>
  <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
    <!-- sidebar -->
    <AppMenu />
    <!-- header -->
    <AppNavBar />
    <!-- main -->
    <main :class="isOpen ? 'lg:ml-60' : 'lg:ml-20'" class="col-span-3 px-5 py-2 mt-16 transition-all ease-in-out">
      <div class="flex items-center flex-wrap justify-end pb-4">
        <BaseBreadCrumbs></BaseBreadCrumbs>
      </div>
      <router-view></router-view>
    </main>
    <!-- footer -->
    <AppFooter />

  </div>

  <teleport to="body">
    <div @click="toggle" :class="isOpen ? 'lg:hidden' : 'hidden lg:hidden'"
      class="block h-screen w-screen bg-[#171925] opacity-50 z-20 fixed top-0">
    </div>
  </teleport>



</template>


<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { RouterView } from 'vue-router';
import AppFooter from '@/components/layouts/AppFooter.vue';
import AppNavBar from '@/components/layouts/AppNavBar.vue';

const store = useStore();
const isOpen = computed(() => store.getters.getToggleState);
const toggle = () => {
  store.dispatch('setToggle', !isOpen.value)
}
</script>
