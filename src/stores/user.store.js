import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useEarthoOne } from '@eartho/one-client-vue';

const useUserStore = defineStore('user', () => {
  const { connectWithRedirect, user, logout, isLoading, isConnected } = useEarthoOne();
  const isAuthenticated = computed(() => !!user.value);

  const login = async () => {
    connectWithRedirect({
      accessId: 'kAVLaL4Z4BEiyH02WnMh',
      enabledAuthProviders: ['google']
    });
  };

  return {
    isConnected,
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  }
});

export default useUserStore;