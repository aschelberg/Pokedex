<script setup>
import _ from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const handleSearch = _.debounce((e) => {
  emit('update:modelValue', e.target.value)
}, 500)

</script>

<template>
  <form class="pb-4 pl-3 pr-2 flex items-center">
   <label class="sr-only">Search:</label>
   <div class="relative w-full p">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
    <input type="text" v-on:input="handleSearch" :value="modelValue" placeholder="Search by name" class="block pl-10 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 my-2 px-2 border border-blue-500 text-grey-900 rounded-lg w-full">
   </div> 
  </form>
</template>

<style lang="scss" scoped>

</style>