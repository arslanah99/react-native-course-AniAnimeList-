import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getAnimeRecommendations = async id => {
  const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/recommendations`;

  const response = await axios.get(selectedAnimeURL);
  return response.data;
};

export const UseGetAnimeRecommendationsQuery = id => {
  const {isLoading, data} = useQuery(
    ['animeRecommendation'],
    () => getAnimeRecommendations(id),
    {refetchOnReconnect: 'always'},
  );
  return {data, isLoading};
};
