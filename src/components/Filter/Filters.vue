<script setup>
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

const type = [
  { name: 'Normal', value: 1},
  { name: 'Fighting', value: 2},
  { name: 'Flying', value: 3},
  { name: 'Poison', value: 4},
  { name: 'Ground', value: 5},
  { name: 'Rock', value: 6},
  { name: 'Bug', value: 7},
  { name: 'Ghost', value: 8},
  { name: 'Steel', value: 9},
  { name: 'Fire', value: 10},
  { name: 'Water', value: 11},
  { name: 'Grass', value: 12},
  { name: 'Electric', value: 13},
  { name: 'Psychic', value: 14},
  { name: 'Ice', value: 15},
  { name: 'Dragon', value: 16},
  { name: 'Dark', value: 17},
  { name: 'Fairy', value: 18},
  { name: 'Stellar', value: 19},
];
const ability = [
    { name: "stench", value: 1},
    { name: "drizzle", value: 2},
    { name: "speed-boost", value: 3},
    { name: "battle-armor", value: 4},
    { name: "sturdy", value: 5},
    { name: "damp", value: 6},
    { name: "limber", value: 7},
    { name: "sand-veil", value: 8},
    { name: "static", value: 9},
    { name: "volt-absorb", value: 10},
    { name: "water-absorb", value: 11},
    { name: "oblivious", value: 12},
    { name: "cloud-nine", value: 13},
    { name: "compound-eyes", value: 14},
    { name: "insomnia", value: 15},
    { name: "color-change", value: 16},
    { name: "immunity", value: 17},
    { name: "flash-fire", value: 18},
    { name: "shield-dust", value: 19},
    { name: "own-tempo", value: 20 }
];
const moves = []

const setType = (e) => {
  filters.value.type = e
  emit("updateFilters", filters.value)
}
const setAbility = (e) => {
  filters.value.ability = e 
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
</template>

<style lang="scss" scoped>

</style>