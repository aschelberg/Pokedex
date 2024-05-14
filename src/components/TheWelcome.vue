<script setup>
import { db } from "@/firebase/index.js";
import { collection, query, orderBy, where, doc, setDoc, getDocs, limit, updateDoc } from "firebase/firestore";
import usePokemon from "@/composables/usePokemon.js";
import Filters from '@/components/Filter/Filters.vue';
import Search from '@/components/Filter/Search.vue';
import { ref, computed, watch } from "vue";

const { getPokemon, getAllPokemon } = usePokemon();

const allPokemon = ref([]);
const searchFilter = ref('');
const filters = ref({});


const fetchPokemon = async () => {
  const dbFilters = [] 
  if(searchFilter.value) {
    dbFilters.push(where("name", "==", searchFilter.value))
  }
  if(filters.value.type) {
    dbFilters.push(where("types", "array-contains", filters.value.type))
  }
  if(filters.value.ability) {
    dbFilters.push(where("abilities", "array-contains", filters.value.ability))
  }
  if(filters.value.move) {
    dbFilters.push(where("moves", "array-contains", filters.value.move))
  }
  if(!searchFilter.value && !filters.value.type && !filters.value.ability && !filters.value.move) {
    dbFilters.push(limit(30))
  }

  const pokemonArray = []
  const q = query(collection(db, "pokemon"), orderBy("id", "asc"), ...dbFilters)
  const pokemon = await getDocs(q);
  pokemon.forEach((doc) => {
    pokemonArray.push(doc.data())
  });
  allPokemon.value = pokemonArray
};

fetchPokemon();

const updateFilters = (updatedFilters) => {
  filters.value = updatedFilters;
};
const clearFilters = (updatedFilters) => {
  searchFilter.value = '';
  filters.value = updatedFilters;
};

watch([searchFilter, filters], fetchPokemon)

</script>

<template>
  <div>
    <Search v-model="searchFilter"/>
  </div>
  <div class="grid grid-cols-6 gap-2">
    <div class="col-span-1">
      <Filters @updateFilters="updateFilters" @clearFilters="clearFilters"/>
    </div>
    <div class="col-span-5">
      <!-- <h1 class="text-xl bg-green-600">{{ filters.type }}</h1>
      <h4 class="text-xl bg-blue-400">{{ filteredPokemon.length }}</h4> -->
      <ul class="grid grid-cols-3">
        <li
          class=""
          v-for="pokemon in allPokemon">
            <div>
              <img :src="pokemon.pic" :alt="`${pokemon.name} Pic`">
            </div>
            <div class="text-md text-xl">{{ pokemon.name.toUpperCase() }}</div>
            <div class="text-xs">#{{ pokemon.id }}</div>
            <div class="flex">
              <div v-for="t in pokemon.types" class="m-1 px-4 py-2 bg-green-200 rounded-full">
                {{ t }}
              </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>