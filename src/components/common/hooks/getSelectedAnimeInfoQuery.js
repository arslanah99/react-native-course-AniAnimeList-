import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getSelectedAnimeInfo = async animeId => {
    console.log(animeId)
  const allAnimeUrl = `https://api.jikan.moe/v4/anime/${animeId}/full`;

  const response = await axios.get(allAnimeUrl);
  return response.data;
};

export const UsegetSelectedAnimeInfoQuery = id => {
  const {isLoading, data} = useQuery(
    ['selectedAnime'],
    () => getSelectedAnimeInfo(id),
    {refetchOnReconnect: "always"},
  );
  return {data, isLoading};
};
