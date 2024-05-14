<script setup>
import useType from "@/composables/useType.js";
import useAbility from "@/composables/useAbility.js";
import useMoves from "@/composables/useMoves.js";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { ref, computed, watch } from 'vue';

const filters = ref({
  type: '',
  ability: '',
  move: '',
});

const emit = defineEmits(["updateFilters", "clearFilters"]);

const clearFilters = () => {
  filters.value.type = '';
  filters.value.ability = '';
  filters.value.move = '';
  emit("clearFilters", filters.value)
}


const types = ref([])
const abilities = ref([]);
const moves = ref([]);

watch(filters, () => {
  emit("updateFilters", filters.value)
}, {deep: true});

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

const queryType = ref('')
const queryAbility = ref('')
const queryMove = ref('')
const filteredType = computed(() =>
  queryType.value === ''
    ? types.value
    : types.value.filter((type) => {
        return type.name.includes(queryType.value.toLowerCase())
      })
)
const filteredAbility = computed(() =>
  queryAbility.value === ''
    ? abilities.value
    : abilities.value.filter((ability) => {
        return ability.name.includes(queryAbility.value.toLowerCase())
      })
)
const filteredMove = computed(() =>
  queryMove.value === ''
    ? moves.value
    : moves.value.filter((move) => {
        return move.name.includes(queryMove.value.toLowerCase())
      })
)

</script>

<template>
  <div class="grid grid-cols-1 gap-2 px-3">
    <div class="max-w-sm mx-full">
      <button type="button" @click.stop="clearFilters" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-500">Clear Filters</button>
    </div>
    <!-- Type Combobox -->
    <Combobox as="div" v-model="filters.type" @update:modelValue="queryType = ''">
      <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select Type</ComboboxLabel>
      <div class="relative mt-2">
        <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @change="queryType = $event.target.value" @blur="queryType = ''" :display-value="(type) => type" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions v-if="filteredType.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="t in filteredType" :key="t.name" :value="t.name" as="template" v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ t.name }}
              </span>
              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <!-- Ability Combobox -->
    <Combobox as="div" v-model="filters.ability" @update:modelValue="queryAbility = ''">
      <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select Ability</ComboboxLabel>
      <div class="relative mt-2">
        <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @change="queryAbility = $event.target.value" @blur="queryAbility = ''" :display-value="(ability) => ability" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions v-if="filteredAbility.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="ability in filteredAbility" :value="ability.name" as="template" v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ ability.name }}
              </span>
              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <!-- Moves Combobox -->
    <Combobox as="div" v-model="filters.move" @update:modelValue="queryMove = ''">
      <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select Move</ComboboxLabel>
      <div class="relative mt-2">
        <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @change="queryMove = $event.target.value" @blur="queryMove = ''" :display-value="(move) => move" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions v-if="filteredMove.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="move in filteredMove" :value="move.name" as="template" v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ move.name }}
              </span>
              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
</template>

<style lang="scss" scoped>

</style>