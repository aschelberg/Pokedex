<script setup>
import usePokemon from "@/composables/usePokemon.js";
import Filters from '@/components/Filter/Filters.vue';
import Search from '@/components/Filter/Search.vue';
import { ref, computed, watch } from "vue";

const { getPokemon, getAllPokemon } = usePokemon();

const allPokemon = ref([]);
const searchFilter = ref('');

const filters = ref({});
const updateFilters = (updatedFilters) => {
  filters.value = updatedFilters;
};

const fetchPokemon = async () => {
  for (let i = 1; i <= 20; i++) {
    const characterObj = await getPokemon(`${i}`);
    allPokemon.value.push(characterObj);
  };
  localStorage.setItem("pokemon", JSON.stringify(allPokemon.value));
};

if (localStorage.getItem("pokemon")) {
  allPokemon.value = JSON.parse(localStorage.getItem("pokemon"));
} else {
  fetchPokemon();
};

const filteredPokemon = computed(() => {
  return allPokemon.value.filter(pokemon => {
    const isTypeFilter = filters.value.type ? pokemon.types.some(type => type.type.name === filters.value.type) : true ;
    const isAbilityFilter = filters.value.ability ? pokemon.abilities.some(ability => ability.ability.name === filters.value.ability) : true ;
    const isMovesFilter = filters.value.move ? pokemon.moves.some(move => move.move.name === filters.value.move) : true ;
    
    const isSearchFilter = searchFilter.value ? pokemon.name.includes(searchFilter.value) : true;
    
    return isTypeFilter && isAbilityFilter && isMovesFilter && isSearchFilter
  });
});

const handleSearch = (search) => {
  searchFilter.value = search;
};


</script>

<template>
  <div>
    <Search @search="handleSearch"/>
  </div>
  <div class="grid grid-cols-6 gap-2">
    <div class="col-span-1">
      <Filters @updateFilters="updateFilters"/>
    </div>
    <div class="col-span-5">
      <h1 class="text-xl bg-green-600">{{ filters.type }}</h1>
      <h4 class="text-xl bg-blue-400">{{ filteredPokemon.length }}</h4>
      <ul class="grid grid-cols-3">
        <li
          class=""
          v-for="pokemon in filteredPokemon">
            <div>
              <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} Pic`">
            </div>
            <div class="text-md text-xl">{{ pokemon.name.toUpperCase() }}</div>
            <div class="text-xs">#{{ pokemon.id }}</div>
            <div class="flex">
              <div v-for="t in pokemon.types" class="m-1 px-4 py-2 bg-green-200 rounded-full">
                {{ t.type.name }}
              </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>