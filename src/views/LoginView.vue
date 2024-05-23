<script setup>
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import useUserStore from '@/stores/user.store.js';

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
watchEffect(() => {
  if (isAuthenticated.value) {
    window.location.href = '/pokedex';
  }
});
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="@/assets/PokemonLogo.png" alt="Pokemon Pokedex" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      {{ isAuthenticated }}
      <button class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-4" @click="userStore.login">Log In</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>