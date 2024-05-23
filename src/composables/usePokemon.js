import useApi from "@/composables/useApi.js";

const usePokemon = () => {
  const { request } = useApi();

  const getAllPokemon = async ({page, limit, ability, type, move, name} = {}) => {
    const { data } = await request('/pokemon', {
      params: {
        page, 
        limit, 
        ability, 
        type, 
        move, 
        name
      }
    })
    return data
  }

  const getPokemon = async (pokemonId) => {
    const { data } = await request(`/pokemon/${pokemonId}`, {
      baseURL: 'https://pokeapi.co/api/v2'
    })
    return data
  }

  return {
    getAllPokemon,
    getPokemon
  };
};

export default usePokemon;