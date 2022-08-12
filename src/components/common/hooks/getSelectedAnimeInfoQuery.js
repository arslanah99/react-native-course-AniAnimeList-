import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getSelectedAnimeInfo = async () => {
  const allAnimeUrl = 'https://api.jikan.moe/v4/anime/1/full';

  const response = await axios.get(allAnimeUrl);
  return response.data;
};

export const UsegetSelectedAnimeInfoQuery = () => {
  const {isLoading, data} = useQuery(['allAnime'], getSelectedAnimeInfo);
  return {data, isLoading};
};
