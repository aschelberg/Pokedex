<script setup>
import useType from '@/composables/useType.js';
import useAbility from '@/composables/useAbility.js';
import useMoves from '@/composables/useMoves.js';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import { ref, computed, watch } from 'vue';

const filters = ref({
  type: '',
  ability: '',
  move: '',
});

const emit = defineEmits(['updateFilters', 'clearFilters']);

const clearFilters = () => {
  filters.value.type = '';
  filters.value.ability = '';
  filters.value.move = '';
  emit('clearFilters', filters.value);
};

const types = ref([]);
const abilities = ref([]);
const moves = ref([]);

watch(
  filters,
  () => {
    emit('updateFilters', filters.value);
  },
  { deep: true }
);

// fetch and set types to local storage for filters
const { getType } = useType();
const fetchTypes = async () => {
  const pokemonTypes = await getType();
  types.value = pokemonTypes.results;
};
fetchTypes();

// fetch and set abilities to local storage for filters
const { getAbility } = useAbility();
const fetchAbility = async () => {
  const pokemonAbility = await getAbility();
  abilities.value = pokemonAbility.results;
};
fetchAbility();

// fetch and set moves to local storage for filters
const { getMoves } = useMoves();
const fetchMoves = async () => {
  const pokemonMoves = await getMoves();
  moves.value = pokemonMoves.results;
};
fetchMoves();

const queryType = ref('');
const queryAbility = ref('');
const queryMove = ref('');
const filteredType = computed(() =>
  queryType.value === ''
    ? types.value
    : types.value.filter((type) => {
        return type.name.includes(queryType.value.toLowerCase());
      })
);
const filteredAbility = computed(() =>
  queryAbility.value === ''
    ? abilities.value
    : abilities.value.filter((ability) => {
        return ability.name.includes(queryAbility.value.toLowerCase());
      })
);
const filteredMove = computed(() =>
  queryMove.value === ''
    ? moves.value
    : moves.value.filter((move) => {
        return move.name.includes(queryMove.value.toLowerCase());
      })
);
</script>

<template>
  <div class="w-full justify-between gap-2 md:grid md:grid-cols-1">
    <!-- Type Combobox -->
    <Combobox
      as="div"
      v-model="filters.type"
      @update:modelValue="queryType = ''"
    >
      <ComboboxLabel
        class="block text-xs font-medium leading-6 text-gray-900 sr-only"
        >Select Type:</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full rounded-lg border border-blue-600 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          @change="queryType = $event.target.value"
          @blur="queryType = ''"
          :display-value="(type) => type"
          placeholder="Select Type"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions
          v-if="filteredType.length > 0"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="t in filteredType"
            :key="t.name"
            :value="t.name"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ t.name[0].toUpperCase() + t.name.slice(1) }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                  active ? 'text-white' : 'text-blue-600',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <!-- Ability Combobox -->
    <Combobox
      as="div"
      v-model="filters.ability"
      @update:modelValue="queryAbility = ''"
    >
      <ComboboxLabel
        class="block text-xs font-medium leading-6 text-gray-900 sr-only"
        >Select Ability:</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full rounded-lg border border-blue-600 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          @change="queryAbility = $event.target.value"
          @blur="queryAbility = ''"
          :display-value="(ability) => ability"
          placeholder="Select Ability"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions
          v-if="filteredAbility.length > 0"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="ability in filteredAbility"
            :value="ability.name"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ ability.name }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                  active ? 'text-white' : 'text-blue-600',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <!-- Moves Combobox -->
    <Combobox
      as="div"
      v-model="filters.move"
      @update:modelValue="queryMove = ''"
    >
      <ComboboxLabel
        class="block text-xs font-medium leading-6 text-gray-900 sr-only"
        >Select Move:</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full rounded-lg border border-blue-600 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          @change="queryMove = $event.target.value"
          @blur="queryMove = ''"
          :display-value="(move) => move"
          placeholder="Select Move"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions
          v-if="filteredMove.length > 0"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="move in filteredMove"
            :value="move.name"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ move.name }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                  active ? 'text-white' : 'text-blue-600',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <div class="relative mt-1 max-w rounded-lg hover:text-black">
      <button
        type="button"
        @click.stop="clearFilters"
        class="w-full rounded-lg border font-medium border-red-500 bg-red-500 py-1.5 text-white sm:text-sm sm:leading-6 hover:bg-blue-300 hover:border-blue-300 transition-all"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
