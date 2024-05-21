<script setup>
import usePokemon from "@/composables/usePokemon";
import PokemonCard from "@/components/Reusables/PokemonCard.vue";
import { ref } from "vue";

const savedPokemon = JSON.parse(localStorage.getItem("savedPokemon"));
</script>

<template>
  <div v-if="!savedPokemon">
    <h3>No pokemon have been bookmarked.</h3>
  </div>
  <div>
    <ul role="list" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <li
        v-for="pokemon in savedPokemon"
        class="border border-blue-600 col-span-1 flex flex-col rounded-lg bg-white shadow"
      >
        <PokemonCard
          :pokemon="pokemon.pokemon"
          :bookmarked="pokemon.bookmarked"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
