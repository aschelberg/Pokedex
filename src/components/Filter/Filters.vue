<script setup>
import useType from "@/composables/useType.js";
import useAbility from "@/composables/useAbility.js";
import useMoves from "@/composables/useMoves.js";
import { ref, computed } from 'vue';

const filters = ref({
  type: '',
  ability: '',
  moves: '',
});

const clearFilters = () => {
  filters.value.type = '';
  filters.value.ability = '';
  filters.value.moves = '';
  emit("updateFilters", filters.value)
}

const show = ref({
  type: false,
  ability: false,
})

const type = ref([])
const ability = ref([]);
const moves = ref([]);

// fetch and set types to local storage for filters
const { getType } = useType();
const fetchTypes = async () => {
  const pokemonTypes = await getType();
  type.value = pokemonTypes;
  localStorage.setItem("types", JSON.stringify(pokemonTypes.results));
};
if (localStorage.getItem("types")) {
  type.value = JSON.parse(localStorage.getItem("types"))
} else {
  fetchTypes();
};

// fetch and set abilities to local storage for filters
const { getAbility } = useAbility();
const fetchAbility = async () => {
  const pokemonAbility = await getAbility();
  localStorage.setItem("ability", JSON.stringify(pokemonAbility.results))
};

if (localStorage.getItem("ability")) {
  ability.value = JSON.parse(localStorage.getItem("ability"))
} else {
  fetchAbility();
};

// fetch and set moves to local storage for filters
const { getMoves } = useMoves();
const fetchMoves = async () => {
  const pokemonMoves = await getMoves();
  localStorage.setItem("moves", JSON.stringify(pokemonMoves.results))
};

if (localStorage.getItem("moves")) {
  moves.value = JSON.parse(localStorage.getItem("moves"))
} else {
  fetchMoves();
};

const setType = (e) => {
  filters.value.type = e
  emit("updateFilters", filters.value)
}
const setAbility = (e) => {
  filters.value.ability = e 
  emit("updateFilters", filters.value)
}
const setMoves = (e) => {
  filters.value.moves = e
  emit("updateFilters", filters.value)
}

const emit = defineEmits(["updateFilters"])

</script>

<template>
   <div class="flex justify-center">
    <button @click.stop="clearFilters" class="text-2xl bg-yellow-300 p-1">Clear Filters</button>
  </div>
  <div>
    <button @click="show.type = !show.type" class="text-2xl">Type</button>
    <ul v-if="show.type" >
      <li v-for="t in type">
        <input @click="setType(t.name.toLowerCase())" type="button" :value="t.name">
      </li>
    </ul>
  </div>
  <div>
    <button @click="show.ability = !show.ability" class="text-2xl">Ability</button>
    <ul v-if="show.ability" >
      <li v-for="a in ability">
        <input @click="setAbility(a.name.toLowerCase())" type="button" :value="a.name">
      </li>
    </ul>
  </div>
  <div>
    <button @click="show.moves = !show.moves" class="text-2xl">Moves</button>
    <ul v-if="show.moves" >
      <li v-for="a in moves">
        <input @click="setMoves(a.name.toLowerCase())" type="button" :value="a.name">
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

</style>