import useApi from "@/composables/useApi.js";

const usePokemon = () => {
  const { request } = useApi();

  const getAllPokemon = async () => {
    const { data } = await request(
      `/pokemon?limit=1500`
    )
    return data
  }

  const getPokemon = async (pokemonId) => {
    const { data } = await request(
      `/pokemon/${pokemonId}`
    )
    return data
  }

  return {
    getAllPokemon,
    getPokemon
  };
};

export default usePokemon;