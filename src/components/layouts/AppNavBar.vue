<template>
  <div class="bg-darken py-2 border-b border-[#818181] border-opacity-10 top-0 fixed w-screen">
    <div class="container mx-auto flex justify-between px-5">
      <a class="md:hidden text-2xl font-bold font-titleFont flex gap-2">
        <i-mingcute-vue-fill class="text-primary" />
        <span>Testify</span>
      </a>
      <button class="lg:hidden xl:hidden" @click="setSelected"><i-solar-list-linear /></button>
      <ul class="grid grid-cols-6 place-items-center">
        <li>
          <a href="google.com"><i-bx-search /></a>
        </li>
        <li><i-heroicons-language /></li>
        <li><i-line-md-moon /></li>
        <li><i-pixelarticons-add-grid /></li>
        <li><i-mdi-bell-outline /></li>
        <li>
          <div class="w-9 h-9">
            <img src="@/assets/images/avatar.png" class="w-full h-full rounded-full" alt="Avatar Logo" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const setSelected = () => {
  store.dispatch('setToggle', true)
}
</script>
