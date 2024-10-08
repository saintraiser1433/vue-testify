<template>
  <div class="flex justify-between items-center md:flex-col lg:flex-row xl:flex-row">
    <div class="p-2 lg:text-sm xl:text-sm">
      <span>Show</span>
      <select class="mx-2 rounded-sm py-1 px-2 bg-darken outline-none border border-colorBorder focus:border-primary"
        v-model="showEntries">

        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <span>Entries</span>
    </div>

    <div class="flex justify-center items-center mb-2 lg:text-sm xl:text-sm">
      <span class="mr-2">Search:</span>
      <base-input v-model="searchInput"></base-input>
    </div>
  </div>

  <div class="overflow-x-auto">

    <table class="border-t border-colorBorder whitespace-nowrap w-100 min-w-full mx-auto">
      <thead class="border-y border-colorBorder text-left">
        <tr>
          <th v-for="headerItem in header" :key="headerItem" class="table__block">
            {{ headerItem }}
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-if="paginatedData && paginatedData.length > 0" class="border-b border-colorBorder"
          v-for="(item, index) in paginatedData" :key="item.id">
          <slot name="row" :item="item" :index="index" />
        </tr>
        <tr v-else class="border-b border-colorBorder">
          <td :colspan="header.length" class="text-center text-base p-2">No data found</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-col lg:flex-row xl:flex-row py-1 items-center lg:text-sm xl:text-sm">
    <span class="font-light opacity-50 text-center flex-grow lg:text-left xl:text-left">
      Showing {{ paginatedData?.length }} out of {{ filteredTableData?.length }}
    </span>
    <ul class="pagination">
      <li class="pagination__item" :class="{ disabled: currentPage === 1 }" @click="prevPage">
        <i-fe-arrow-left></i-fe-arrow-left>
      </li>
      <li class="pagination__item" v-for="page in totalPages" :key="page"
        :class="{ 'pagination-active': currentPage === page }" @click="setPage(page)">
        <a href="#">{{ page }}</a>
      </li>
      <li class="pagination__item" :class="{ disabled: currentPage === totalPages }" @click="nextPage">
        <i-fe-arrow-right></i-fe-arrow-right>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRefs, ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  header: {
    type: Array,
    required: true
  }
})

const { data, header } = toRefs(props)

const searchInput = ref('')
const showEntries = ref(10)
const currentPage = ref(1)




const filteredTableData = computed(() => {
  return data.value?.filter((item) => {
    return Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchInput.value)
    )
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredTableData.value.length / showEntries.value)
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * showEntries.value
  const end = start + showEntries.value
  return filteredTableData.value?.slice(start, end)
})

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}




</script>