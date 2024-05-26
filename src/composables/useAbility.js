import useApi from '@/composables/useApi.js';

const useAbility = () => {
  const { request } = useApi();

  const getAbility = async () => {
    const { data } = await request(
      `/ability/?offset=0&limit=367`,
      {
        baseURL: 'https://pokeapi.co/api/v2'
      }
    )
    return data
  }

  return {
    getAbility
  };
};

export default useAbility;