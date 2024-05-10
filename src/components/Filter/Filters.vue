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

const types = ref([])
const abilities = ref([]);
const moves = ref([]);

// fetch and set types to local storage for filters
const { getType } = useType();
const fetchTypes = async () => {
  const pokemonTypes = await getType();
  localStorage.setItem("types", JSON.stringify(pokemonTypes.results));
};
if (localStorage.getItem("types")) {
  types.value = JSON.parse(localStorage.getItem("types"))
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
  abilities.value = JSON.parse(localStorage.getItem("ability"))
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

const setFilters = () => {
  emit("updateFilters", filters.value)
}

const emit = defineEmits(["updateFilters"])

</script>

<template>
  <div>
    <label for="type" class="sr-only">Select Type</label>
    <select name="type" id="type" v-model="filters.type" @click="setFilters">
      <option value="">Select Type</option>
      <option v-for="t in types" :value="t.name">{{ t.name }}</option>
    </select>
  </div>
  <div>
    <label for="ability" class="sr-only">Select Ability</label>
    <select name="ability" id="ability" v-model="filters.ability" @click="setFilters">
      <option value="">Select Ability</option>
      <option v-for="ability in abilities" :value="ability.name">{{ ability.name }}</option>
    </select>
  </div>
  <div>
    <label for="move" class="sr-only">Select Move</label>
    <select name="move" id="move" v-model="filters.moves" @click="setFilters">
      <option value="">Select Move</option>
      <option v-for="move in moves" :value="move.name">{{ move.name }}</option>
    </select>
  </div>
  
</template>

<style lang="scss" scoped>

</style>