<script setup>
import usePokemon from "@/composables/usePokemon";
import TypeBadge from "@/components/Reusables/TypeBadge.vue";
import { BookmarkIcon as BookmarkIconFalse } from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkIconTrue } from "@heroicons/vue/20/solid";
import { computed, ref } from "vue";

const emit = defineEmits(['updated'])

const props = defineProps({
  pokemon: {
    type: Object,
  },
  savedPokemon: {
    type: Array,
    default: []
  }
});

const { savePokemon, removePokemon } = usePokemon();

const isSaved = computed(() => {
  return props.savedPokemon.find(p => p.id === props.pokemon.id);
});

const handleSave = async (id) => {
  await savePokemon(id);
  emit('updated')
};

const handleRemove = async (id) => {
  await removePokemon(id);
  emit('updated')
};

</script>

<template>
  <div class="flex flex-1 flex-col px-5">
    <img
      class="m-auto h-36 w-36 flex-shrink-0 rounded-full"
      :src="pokemon.pic"
      :alt="`${pokemon.name} Pic`"
    />
    <div class="flex justify-between">
      <RouterLink :to="`/pokemon/${pokemon.name}`">
        <div class="text-2xl font-medium text-gray-900 hover:text-blue-400">
          {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <button v-if="!isSaved" @click="handleSave(pokemon.id)">
          <BookmarkIconFalse class="h-8 w-6 text-blue-700 cursor-pointer" />
        </button>
        <button v-else @click="handleRemove(pokemon.id)">
          <BookmarkIconTrue class="h-8 w-6 text-blue-700 cursor-pointer" />
        </button>
        
      </div>
    </div>
    <div>
      <span>#</span>
      <!-- {{ pokemon.id }} -->
      {{ pokemon.id.toString().padStart(4, "0") }}
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

<style lang="scss" scoped></style>
