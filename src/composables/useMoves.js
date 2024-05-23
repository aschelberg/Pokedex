import useApi from "@/composables/useApi.js";

const useMoves = () => {
  const { request } = useApi();

  const getMoves = async () => {
    const { data } = await request(
      `/move/?offset=0&limit=937`,
      {
        baseURL: 'https://pokeapi.co/api/v2'
      }
    )
    return data
  }

  return {
    getMoves
  };
};

export default useMoves;