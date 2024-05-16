<script setup>
import usePokemon from "@/composables/usePokemon.js";
import Filters from '@/components/Filter/Filters.vue';
import Search from '@/components/Filter/Search.vue';
import PokemonCard from '@/components/Reusables/PokemonCard.vue';
import { ref, computed, watch } from "vue";

const { getPokemon, getAllPokemon } = usePokemon();

const allPokemon = ref([]);
const searchFilter = ref('');
const filters = ref({});
const page = ref(1);
const limit = ref(9)
const pagination = ref({})

const fetchPokemon = async () => {
  const { docs, totalDocs, hasPrevPage, hasNextPage, prevPage, nextPage } = await getAllPokemon({
    page: page.value, 
    limit: limit.value, 
    ability: filters.value.ability, 
    type: filters.value.type, 
    move: filters.value.move, 
    name: searchFilter.value
  });

  pagination.value = {
    totalDocs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  }

  allPokemon.value = docs
};

fetchPokemon();

const updatePage = (pageIndicator) => {
  if (pageIndicator === 'next' && pagination.value.hasNextPage) page.value = pagination.value.nextPage;
  if (pageIndicator === 'prev' && pagination.value.hasPrevPage) page.value = pagination.value.prevPage;
}

const updateFilters = (updatedFilters) => {
  filters.value = updatedFilters;
  console.log(filters.value)
};
const clearFilters = (updatedFilters) => {
  searchFilter.value = '';
  filters.value = updatedFilters;
};

watch([searchFilter, filters, page], fetchPokemon, {deep: true})

</script>

<template>
  <div>
    <!-- search -->
    <div>
      <Search v-model="searchFilter"/>
    </div>
    <!-- filters and pokemon grid -->
    <div class="grid grid-cols-6 gap-2">
      <div class="col-span-1">
        <Filters @updateFilters="updateFilters" @clearFilters="clearFilters"/>
      </div>
      <div class="p-2 col-span-5">
        <ul role="list" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li v-for="pokemon in allPokemon" class="border border-blue-600 col-span-1 flex flex-col rounded-lg bg-white shadow">
            <PokemonCard :pokemon="pokemon"/>
          </li>
        </ul>
      </div>
    </div>
    <!-- Pagination -->
    <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ (limit*page) - (limit - 1) }}</span>
          to
          <span class="font-medium">{{ limit*page }}</span>
          of
          <span class="font-medium">{{ pagination.totalDocs }}</span>
          results
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end">
        <button @click="updatePage('prev')" :disabled="!pagination.hasPrevPage" class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Previous</button>
        <button @click="updatePage('next')" :disabled="!pagination.hasNextPage" class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Next</button>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>

</style>