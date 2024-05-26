import useApi from '@/composables/useApi.js';

const useType = () => {
  const { request } = useApi();

  const getType = async () => {
    const { data } = await request(
      `/type/?offset=0&limit=21`,
      {
        baseURL: 'https://pokeapi.co/api/v2'
      }
    )
    return data
  }

  return {
    getType
  };
};

export default useType;