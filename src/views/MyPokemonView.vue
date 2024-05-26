<script setup>
import usePokemon from '@/composables/usePokemon';
import PokemonCard from '@/components/Reusables/PokemonCard.vue';
import { ref } from 'vue';

const savedPokemon = ref([]);
const { myPokemon } = usePokemon();
const fetchSavedPokemon = async () => {
  savedPokemon.value = await myPokemon();
};
fetchSavedPokemon()

const updated = () => fetchSavedPokemon()

</script>

<template>
  <div>
    <div v-if="savedPokemon.length === 0">
      <h3>No pokemon have been bookmarked.</h3>
    </div>
    <div>
      <ul role="list" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <li
          v-for="pokemon in savedPokemon"
          class="border border-blue-600 col-span-1 flex flex-col rounded-lg bg-white shadow"
        >
          <PokemonCard
            :pokemon="pokemon"
            :savedPokemon="savedPokemon"
            @updated="updated"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
