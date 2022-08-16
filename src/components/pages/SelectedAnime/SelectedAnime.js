import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {UseGetSelectedAnimeInfo} from '../../common/hooks/getSelectedAnimeInfoQuery';
import AnimeRecommendationsScreen from './AnimeRecommendations';
import AnimeTrailerScreen from './AnimeTrailer';

const dimensionsForScreen = Dimensions.get('screen');

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    height: dimensionsForScreen.height,
  },
});

const SelectedAnimeScreen = ({route}) => {
  const selectedanimeData = route.params.selectedAnimeObj;
  const {data, isLoading} = UseGetSelectedAnimeInfo(selectedanimeData.mal_id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AnimeTrailerScreen data={data} isLoading={isLoading} />
        <AnimeRecommendationsScreen animeId={selectedanimeData.mal_id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedAnimeScreen;
