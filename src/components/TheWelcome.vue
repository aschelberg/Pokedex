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

const updateFilters = (updatedFilters) => {
  filters.value = updatedFilters;
  console.log(filters.value)
};
const clearFilters = (updatedFilters) => {
  searchFilter.value = '';
  filters.value = updatedFilters;
};

watch([searchFilter, filters], fetchPokemon, {deep: true})

</script>

<template>

  <div>
    <pre>{{ pagination }}</pre>
    <Search v-model="searchFilter"/>
  </div>
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
</template>

<style lang="scss" scoped>

</style>