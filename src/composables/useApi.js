import axios from 'axios';
import { useEarthoOne } from '@eartho/one-client-vue';

const useApi = () => {
  const { idToken } = useEarthoOne();
  const request = async (url, config = {}) => {
    const baseURL = config.baseURL || 'https://api.modernizd.com';
    config.headers = config.headers || {};
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers
    };
    
    if (baseURL !== 'https://pokeapi.co/api/v2') {
      headers.Authorization = `Bearer ${idToken.value}`;
    }
    delete config.headers;
    delete config.baseURL;

    try {
      return await axios({
        baseURL,
        url,
        ...config,
        headers
      });
    } catch (error) {
      console.log(error);
    };
  };

  return {
    request
  };
};

export default useApi;