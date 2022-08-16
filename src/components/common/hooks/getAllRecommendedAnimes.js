import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getAnimeRecommendations = async id => {
  const recommendedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/recommendations`;

  const response = await axios.get(recommendedAnimeURL);
  return response.data;
};

export const UseGetAnimeRecommendationsQuery = id => {
  const {isLoading, data} = useQuery(
    ['recommendedAnime'],
    () => getAnimeRecommendations(id),
    {refetchOnReconnect: 'always'},
  );
  return {data, isLoading};
};
