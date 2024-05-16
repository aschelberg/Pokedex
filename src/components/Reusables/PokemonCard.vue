<script setup>
import TypeBadge from "@/components/Reusables/TypeBadge.vue";
import { BookmarkIcon as BookmarkIconFalse } from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkIconTrue } from "@heroicons/vue/20/solid";

const props = defineProps({
  pokemon: {
    type: Object,
  }
})

</script>

<template>
  <div class="flex flex-1 flex-col px-3">
    <img class="m-auto h-56 w-56 flex-shrink-0 rounded-full" :src="pokemon.pic" :alt="`${pokemon.name} Pic`"/>
    <div class="flex justify-between pr-4">
      <RouterLink :to="`/pokemon/${pokemon.name}/${pokemon.id}`">
        <div class="text-2xl font-medium text-gray-900 hover:text-blue-400">
          {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <BookmarkIconFalse v-if="true" class="h-8 w-6 text-blue-700"/>
        <BookmarkIconTrue v-else class="h-8 w-6 text-blue-700" />
      </div>
    </div>
    <div>
      {{ pokemon.id }}
    </div>
    <!-- <dl class="mt-1 flex flex-grow flex-col justify-between">
      <dt class="sr-only">Role</dt>
      <dd class="mt-3">
        <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ person.role }}</span>
      </dd>
    </dl> -->
    <div class="flex justify-left gap-2 py-2">
      <TypeBadge v-for="t in pokemon.types" :pokemonType="t" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>