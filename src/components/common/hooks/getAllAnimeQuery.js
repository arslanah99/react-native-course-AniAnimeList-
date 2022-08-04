import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const allAnimeUrl = 'https://api.jikan.moe/v4/anime';
const getAllAnime = async () => {
  const response = await axios.get(allAnimeUrl);
  return response.data;
};

export const UseGetAllAnime = () => {
  const {isLoading, data} = useQuery(['allAnime'], getAllAnime);
  return {data, isLoading};
};
