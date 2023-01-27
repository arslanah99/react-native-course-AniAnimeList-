import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  View,
  Text
} from 'react-native';
import {UseGetSelectedAnimeInfo} from '../../common/hooks/getSelectedAnimeInfoQuery';
import AnimeRecommendationScreen from './AnimeRecommendations';
import AnimeTrailerScreen from './AnimeTrailer';
import SelectedAnimePics from './SelectedAnimePics';
import SharedAnime from './SharedAnime';
import {TabView} from 'react-native-tab-view';

const dimensionsForScreen = Dimensions.get('screen');

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    height: dimensionsForScreen.height,
  },
});

const SelectedAnimeScreen = ({route}) => {
  const [fallbackURL, setFallbackURL] = useState(null);
  const selectedanimeData = route.params.selectedAnimeObj;
  const {data, isLoading} = UseGetSelectedAnimeInfo(selectedanimeData.mal_id);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'animeInfo', title: 'Anime Info'},
    {key: 'recommendedAnime', title: 'Recommended Anime'},
  ]);
  const [index, setIndex] = useState(0);

  const AnimeInfo = () => (
    <ScrollView>
      <AnimeTrailerScreen data={data} isLoading={isLoading} />
      <View>
        <Text>{data === undefined ? null : data.data.synopsis}</Text>
      </View>
      {fallbackURL ? <SharedAnime fallbackURL={fallbackURL} /> : null}
    </ScrollView>
  );

  const RecommendedAnime = () => (
    <ScrollView>
      <AnimeRecommendationScreen animeId={selectedanimeData.mal_id} />
      {fallbackURL ? <SharedAnime fallbackURL={fallbackURL} /> : null}
    </ScrollView>
  );

  useEffect(() => {
    if (data) {
      setFallbackURL(data.data.url);
    }
  }, [data]);
  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'animeInfo':
              return AnimeInfo();
            case 'recommendedAnime':
              return RecommendedAnime();
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default SelectedAnimeScreen;
