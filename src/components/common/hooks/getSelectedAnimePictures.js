import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getSelectedAnimePictures = async id => {
  const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${id}/pictures`;
  const response = await axios.get(selectedAnimeURL);
  return response.data;
};

export const UseGetSelectedAnimePictures = id => {
  const {isLoading, data} = useQuery(
    ['selectedAnimePics'],
    () => getSelectedAnimePictures(id),
    {refetchOnReconnect: 'always'},
  );
  return {data, isLoading};
};
