import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import {UseGetSelectedAnimeInfo} from '../../common/hooks/getSelectedAnimeInfoQuery';
import AnimeRecommendationScreen from './AnimeRecommendations';
import AnimeTrailerScreen from './AnimeTrailer';
import SharedAnime from './SharedAnime';

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
  const [fallbackURL, setFallbackURL] = useState(null);
  const selectedanimeData = route.params.selectedAnimeObj;
  const {data, isLoading} = UseGetSelectedAnimeInfo(selectedanimeData.mal_id);

  useEffect(() => {
    if (data) {
      setFallbackURL(data.data.url);
    }
  }, [data]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AnimeTrailerScreen data={data} isLoading={isLoading} />
        <AnimeRecommendationScreen animeId={selectedanimeData.mal_id} />
        {fallbackURL ? <SharedAnime fallbackURL={fallbackURL} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedAnimeScreen;
