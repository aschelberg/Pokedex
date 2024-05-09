<script setup>
import usePokemon from "@/composables/usePokemon.js";
import Filters from '@/components/Filter/Filters.vue';
import Search from '@/components/Filter/Search.vue';
import { ref, computed, watch } from "vue";

const { getPokemon } = usePokemon();

const allPokemon = ref([]);
const searchFilter = ref('');

const filters = ref({});
const updateFilters = (updatedFilters) => {
  filters.value = updatedFilters;
};

const fetchPokemon = async () => {
  const list = []
  for (let i = 1; i <= 25; i++) {
    const characterObj = await getPokemon(`${i}`);
    list.push(characterObj);
  };
  localStorage.setItem("pokemon", JSON.stringify(list));
  allPokemon.value = list
};

if (localStorage.getItem("pokemon")) {
  allPokemon.value = JSON.parse(localStorage.getItem("pokemon"));
} else {
  fetchPokemon();
};

const filteredPokemon = computed(() => {
  return allPokemon.value.filter(pokemon => {
    const isTypeFilter = filters.value.type ? pokemon.types.some(type => {return type.type.name === filters.value.type;}) : true ;
    const isAbilityFilter = filters.value.ability ? pokemon.abilities.some(ability => {return ability.ability.name === filters.value.ability;}) : true ;
    const isMovesFilter = filters.value.moves ? pokemon.moves.some(move => {return move.move.name === filters.value.moves;}) : true ;
    
    const isSearchFilter = searchFilter.value ? pokemon.name.includes(searchFilter.value) : true;
    
    return isTypeFilter && isAbilityFilter && isMovesFilter && isSearchFilter
  });
  
  // if (searchFilter.value !== '') {
  //   return list.filter(i => i.name.includes(searchFilter.value))
  // }
});

const handleSearch = (search) => {
  searchFilter.value = search;
};


</script>

<template>
  <div>
    <Search @search="handleSearch"/>
  </div>
  <div class="grid grid-cols-2">
    <div>
      <Filters @updateFilters="updateFilters"/>
    </div>
    <div>
      <h1 class="text-xl bg-green-600">{{ filters.type }}</h1>
      <h4 class="text-xl bg-blue-400">{{ filteredPokemon.length }}</h4>
      <ul>
        <li
          class=""
          v-for="pokemon in filteredPokemon">
            <div class="text-md text-xl">{{ pokemon.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>