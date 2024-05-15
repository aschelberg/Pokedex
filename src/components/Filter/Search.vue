<script setup>
import _ from "lodash";

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const handleSearch = _.debounce((e) => {
  emit('update:modelValue', e.target.value)
}, 500)

</script>

<template>
  <form class="py-4 pl-3 pr-2 flex items-center">
   <label class="sr-only">Search:</label>
   <div class="relative w-full p">
    <input type="text" v-on:input="handleSearch" :value="modelValue" placeholder="Search by name" class="my-2 px-2 border border-blue-500 text-grey-900 rounded-sm w-full">
   </div> 
  </form>
</template>

<style lang="scss" scoped>

</style>