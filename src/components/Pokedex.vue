<script setup>
import usePokemon from "@/composables/usePokemon.js";
import Filters from "@/components/Filter/Filters.vue";
import Search from "@/components/Filter/Search.vue";
import PokemonCard from "@/components/Reusables/PokemonCard.vue";
import { ref, computed, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PlusIcon } from "@heroicons/vue/20/solid";

const mobileFiltersOpen = ref(false);

const { getPokemon, getAllPokemon } = usePokemon();

const allPokemon = ref([]);
const searchFilter = ref("");
const filters = ref({});
const page = ref(1);
const limit = ref(9);
const pagination = ref({});

const fetchPokemon = async () => {
  const { docs, totalDocs, hasPrevPage, hasNextPage, prevPage, nextPage } =
    await getAllPokemon({
      page: page.value,
      limit: limit.value,
      ability: filters.value.ability,
      type: filters.value.type,
      move: filters.value.move,
      name: searchFilter.value,
    });

  pagination.value = {
    totalDocs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  };

  allPokemon.value = docs;
};

// const fetchSavedPokemon = (name) => {
//   const savedPokemon = JSON.parse(localStorage.getItem("savedPokemon"));
//   const foundPokemon = savedPokemon.find((t) => t.pokemon.name === name)
//   return foundPokemon ? foundPokemon.bookmarked : foundPokemon
// }

fetchPokemon();

const updatePage = (pageIndicator) => {
  if (pageIndicator === "next" && pagination.value.hasNextPage)
    page.value = pagination.value.nextPage;
  if (pageIndicator === "prev" && pagination.value.hasPrevPage)
    page.value = pagination.value.prevPage;
};

const updateFilters = (updatedFilters) => {
  filters.value = updatedFilters;
};
const clearFilters = (updatedFilters) => {
  searchFilter.value = "";
  filters.value = updatedFilters;
};

watch([searchFilter, filters, page], fetchPokemon, { deep: true });
</script>

<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog
          class="relative z-40 lg:hidden"
          @close="mobileFiltersOpen = false"
        >
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-lg"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure
                    as="div"
                    class="border-t border-gray-200 pb-4 pt-4"
                    v-slot="{ open }"
                  >
                    <fieldset>
                      <legend class="w-full px-2">
                        <DisclosureButton
                          class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                        >
                          <Filters
                            @updateFilters="updateFilters"
                            @clearFilters="clearFilters"
                          />
                        </DisclosureButton>
                      </legend>
                    </fieldset>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto px-1 lg:max-w-7xl lg:px-8">
        <!-- search -->
        <div>
          <Search v-model="searchFilter" />
        </div>
        <div
          class="pb-12 pt-4 sm:grid sm:grid-cols-3 md:grid-cols-5 md:gap-x-2 lg:grid-cols-6"
        >
          <aside>
            <h2 class="sr-only">Filters</h2>

            <button
              type="button"
              class="inline-flex items-center md:hidden px-2"
              @click="mobileFiltersOpen = true"
            >
              <span class="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon
                class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div class="hidden md:block">
              <form class="space-y-10 divide-y divide-gray-200">
                <div>
                  <fieldset>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <Filters
                          @updateFilters="updateFilters"
                          @clearFilters="clearFilters"
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </aside>

          <section
            aria-labelledby="product-heading"
            class="mt-4 sm:col-span-3 md:col-span-4 md:mt-0 lg:col-span-5"
          >
            <h2 id="product-heading" class="sr-only">Pokemon</h2>

            <div class="pl-2 col-span-5">
              <!-- Pagination -->
              <div
                class="flex items-center justify-between bg-white pb-3"
                aria-label="Pagination"
              >
                <div class="pl-2 hidden sm:block">
                  <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{
                      limit * page - (limit - 1)
                    }}</span>
                    to
                    <span class="font-medium">{{ limit * page }}</span>
                    of
                    <span class="font-medium">{{ pagination.totalDocs }}</span>
                    results
                  </p>
                </div>
                <div class="flex flex-1 justify-between sm:justify-end">
                  <button
                    @click="
                      updatePage('prev');
                      fetchPokemon();
                    "
                    :disabled="!pagination.hasPrevPage"
                    class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border border-blue-600 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Previous
                  </button>
                  <button
                    @click="
                      updatePage('next');
                      fetchPokemon();
                    "
                    :disabled="!pagination.hasNextPage"
                    class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border border-blue-600 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </button>
                </div>
              </div>
              <!-- Pokemon Tiles -->
              <ul role="list" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <li
                  v-for="pokemon in allPokemon"
                  class="border border-blue-600 col-span-1 flex flex-col rounded-lg bg-white shadow"
                >
                  <PokemonCard :pokemon="pokemon" />
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
