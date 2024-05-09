import useApi from "@/composables/useApi.js";

const usePokemon = () => {
  const { request } = useApi();

  const getPokemon = async (pokemonId) => {
    const { data } = await request(
      `/pokemon/${pokemonId}`
    )
    return data
  }

  return {
    getPokemon
  };
};

export default usePokemon;