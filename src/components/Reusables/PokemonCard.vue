<script setup>
import TypeBadge from "@/components/Reusables/TypeBadge.vue";
import { BookmarkIcon as BookmarkIconFalse } from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkIconTrue } from "@heroicons/vue/20/solid";
import { computed, ref, watch } from "vue";

const props = defineProps({
  pokemon: {
    type: Object,
  },
  bookmarked: {
    type: Boolean,
  }
})

const bookmarkBool = ref(props.bookmarked);
const bookmarkItems = ref([]);
bookmarkItems.value = JSON.parse(localStorage.getItem("bookmarkedPokemon"))
  

const bookmarkToggle = (pokemonName) => {
  const pokemonFound = bookmarkItems.value.find((t) => {
    if(t.name === pokemonName) bookmarkBool.value = !t.bookmarked
    return t.name === pokemonName
  })
  if(pokemonFound){
    pokemonFound.bookmarked = !pokemonFound.bookmarked;
    localStorage.setItem("bookmarkedPokemon", JSON.stringify(bookmarkItems.value));
  } else {
    bookmarkItems.value.push({
    name: pokemonName,
    bookmarked: true,
    });
    
    localStorage.setItem("bookmarkedPokemon", JSON.stringify(bookmarkItems.value));
    bookmarkBool.value = true
  }
}
</script>

<template>
  <div class="flex flex-1 flex-col px-5">
    <img class="m-auto h-36 w-36 flex-shrink-0 rounded-full" :src="pokemon.pic" :alt="`${pokemon.name} Pic`"/>
    <div class="flex justify-between">
      <RouterLink :to="`/pokemon/${pokemon.name}`">
        <div class="text-2xl font-medium text-gray-900 hover:text-blue-400">
          {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i class="fa-light fa-bookmark"></i>
        <BookmarkIconFalse v-if="!bookmarkBool" class="h-8 w-6 text-blue-700 cursor-pointer" @click="bookmarkToggle(pokemon.name)"/>
        <BookmarkIconTrue v-else class="h-8 w-6 text-blue-700 cursor-pointer" @click="bookmarkToggle(pokemon.name)"/>
      </div>
    </div>
    <div>
      <span>#</span>
      <!-- {{ pokemon.id }} -->
      {{ pokemon.id.toString().padStart(4,'0') }}
    </div>
    <!-- <dl class="mt-1 flex flex-grow flex-col justify-between">
      <dt class="sr-only">Role</dt>
      <dd class="mt-3">
        <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ person.role }}</span>
      </dd>
    </dl> -->
    <div class="flex justify-left gap-2 pb-4 pt-2">
      <TypeBadge v-for="t in pokemon.types" :pokemonType="t" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>