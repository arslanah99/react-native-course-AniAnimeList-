import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getSelectedAnimeInfo = async id => {
  const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/full`;

  const response = await axios.get(selectedAnimeURL);
  return response.data;
};

export const UseGetSelectedAnimeInfo = id => {
  const {isLoading, data} = useQuery(
    ['selectedAnime'],
    () => getSelectedAnimeInfo(id),
    {refetchOnReconnect: 'always'},
  );
  return {data, isLoading};
};
