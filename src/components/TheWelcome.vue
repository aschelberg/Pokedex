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
    dbFilters.push(where("name", "==", searchFilter.value), limit(10))
  }
  if(filters.value.type) {
    dbFilters.push(where("types", "array-contains", filters.value.type), limit(10))
  }
  if(filters.value.ability) {
    dbFilters.push(where("abilities", "array-contains", filters.value.ability), limit(10))
  }
  if(filters.value.move) {
    dbFilters.push(where("moves", "array-contains", filters.value.move), limit(10))
  }
  if(!searchFilter.value && !filters.value.type && !filters.value.ability && !filters.value.move) {
    dbFilters.push(limit(1500))
  }

  const pokemonArray = []
  const q = query(collection(db, "pokemon"), orderBy("id", "asc"), ...dbFilters)
  const pokemon = await getDocs(q);
  pokemon.forEach((doc) => {
    pokemonArray.push(doc.data())
  });
  allPokemon.value = pokemonArray
  console.log(allPokemon.value)
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
              <div v-for="t in pokemon.types"
                :class="`${t}`"
                id="type_style"
              >
                {{ t }}
              </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#type_style {
  margin: 4px;
  padding: 8px 16px;
  border-radius: 25px;
  border-style: solid;
  border-color: #000000;
}

.normal 
  {color: #000000; background: #D2B48C}
.fighting
 {color: #FFFFFF; background: #DC143C}
.flying
 {color: #000000; background: #87CEFA}
.poison
 {color: #FFFFFF; background: #800080}
.ground
 {color: #000000; background: #999999}
.rock
 {color: #000000; background: 	#8B4513}
.bug
 {color: #FFFFFF; background: #483D8B}
.ghost
 {color:  #000000; background: #DCDCDC}
.steel
 {color: #FFFFFF; background: #C0C0C0}
.fire
 {color: #FFFFFF; background: #FF8C00}
.water
 {color: #FFFFFF; background: #00008B}
.grass
 {color: #000000; background: #228B22}
.electric
 {color: #000000; background: #FFFF00}
.psychic
 {color: #FFFFFF; background: #C71585}
.ice
 {color: #000000; background: #AFEEEE}
.dragon
 {color: #000000; background: #708090}
.dark
 {color: #FFFFFF; background: #000000}
.fairy
 {color: #000000; background: #FFC0CB}
.stellar
 {color: #000000; background: #E6E6FA}
.unknown
 {color: #FFFFFF; background: #000000}
.shadow
 {color: #FFFFFF; background: #454545}

</style>