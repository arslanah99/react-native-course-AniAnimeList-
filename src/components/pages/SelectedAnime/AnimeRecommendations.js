import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {UseGetAnimeRecommendationsQuery} from '../../common/hooks/getAnimeRecommendationsQuery';

const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    height: 200,
    width: 100,
    borderRadius: 10,
    margin: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  pushTextToBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    color: 'white',
  },
});

const dimensionsForScreen = Dimensions.get('screen');

const renderList = (type, animeData, index) => {
  const animeObj = animeData.entry;
  return (
    <View>
      <TouchableOpacity activeOpacity={0.9}>
        <ImageBackground
          source={{uri: animeObj.images.jpg.image_url}}
          style={styles.tinyLogo}>
          <View style={styles.overlay} />
          <View style={styles.pushTextToBottom}>
            <Text style={styles.textStyles}>{animeObj.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const AnimeRecommendationScreen = ({animeId}) => {
  const {data, isLoading} = UseGetAnimeRecommendationsQuery(animeId);
  const [dataProvider, setDataProvider] = React.useState(
    createNewDataProvider().cloneWithRows(data.data),
  );

  const _layoutProvider = new LayoutProvider(
    index => 0,
    (type, dim) => {
      dim.width = dimensionsForScreen.width / 1;
      dim.height = dimensionsForScreen.width / 1;
    },
  );

  useEffect(() => {
    setDataProvider(createNewDataProvider().cloneWithRows(data.data));
  }, [data.data]);
  return (
    <View
      style={{
        height: 250,
        width: 250,
      }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View>
          {data.data ? (
            <View
              style={{
                width: dimensionsForScreen.width,
                height: 250,
              }}>
              <RecyclerListView
                isHorizontal
                layoutProvider={_layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={(type, animeData, index) =>
                  renderList(type, animeData, index)
                }
                snapToAlignment={'start'}
                disableIntervalMomentum={true}
                showsVerticalScrollIndicator={false}
                forceNonDeterministicRendering
                showsHorizontalScrollIndicator={false}
                canChangeSize
              />
            </View>
          ) : (
            <Text>No Recommendations</Text>
          )}
        </View>
      ) : (
        <Text>Whoops no data Available</Text>
      )}
    </View>
  );
};

export default AnimeRecommendationScreen;
