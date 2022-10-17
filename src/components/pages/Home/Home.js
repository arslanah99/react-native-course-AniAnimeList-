import React, {useEffect, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {UseGetAllAnime} from '../../common/hooks/getAllAnimeQuery';
import AnimeList from './AnimeList';
import {UseGetSelectedAnimeInfo} from '../../common/hooks/getSelectedAnimeInfoQuery';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import axios from 'axios';

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
});

const HomeScreen = ({navigation}) => {
  const {data, isLoading} = UseGetAllAnime();

  const renderItem = ({item}) => <AnimeList animeObj={item} />;

  const handleDynamicLink = useCallback(
    async link => {
      if (link.url) {
        console.log(link);
        const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${
          link.url.match(/[0-9]+/g)[0]
        }`;
        const response = await axios.get(selectedAnimeURL);
        if (response) {
          navigation.navigate('SelectedAnime', {
            selectedAnimeObj: response.data.data,
          });
        }
      }
    },
    [navigation],
  );

  useEffect(() => {
    const unSubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unSubscribe();
  }, [handleDynamicLink]);

  useEffect(() => {
    const fetchScreen = async () => {
      const getInitialLink = await dynamicLinks().getInitialLink();
      if (getInitialLink !== null) {
        if (getInitialLink.url) {
          const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${
            getInitialLink.url.match(/[0-9]+/g)[0]
          }`;
          const response = await axios.get(selectedAnimeURL);
          if (response) {
            navigation.navigate('SelectedAnime', {
              selectedAnimeObj: response.data.data,
            });
          }
        }
      }
    };
    fetchScreen();
  }, [navigation]);

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <FlatList
          columnWrapperStyle={styles.columnWrapperStyle}
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // keyExtractor={item => item.id}
          numColumns={2}
        />
      ) : (
        <Text>Whoops No Data Available</Text>
      )}
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
