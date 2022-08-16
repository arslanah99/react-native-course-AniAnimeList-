import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {UseGetAnimeRecommendationsQuery} from '../../common/hooks/getAllRecommendedAnimes';

const dimensionsForScreen = Dimensions.get('screen');
const createDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    height: dimensionsForScreen.height,
  },
  tinyImage: {height: 200, width: 100, borderRadius: 10, margin: 10},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0, 0, 0.48)',
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

const renderList = (type, animeData, index) => {
  const animeObj = animeData.entry;
  return (
    <View>
      <TouchableOpacity activeOpacity={0.9}>
        <ImageBackground
          source={{uri: animeObj.images.jpg.image_url}}
          style={styles.tinyImage}>
          <View style={styles.overlay} />
          <View style={styles.pushTextToBottom}>
            <Text style={styles.textStyles}>{animeObj.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const AnimeRecommendationsScreen = ({animeId}) => {
  const {data, isLoading} = UseGetAnimeRecommendationsQuery(animeId);
  const [dataProvider, setDataProvider] = useState(null);

  const _layoutProvider = new LayoutProvider(
    index => 0,
    (type, dim) => {
      dim.width = dimensionsForScreen.width;
      dim.height = dimensionsForScreen.height;
    },
  );

  useEffect(() => {
    if (isLoading === false && data !== undefined) {
      setDataProvider(createDataProvider().cloneWithRows(data.data));
    }
  }, [data, isLoading]);

  return (
    <View style={{width: 250, height: 250}}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View style={{width: dimensionsForScreen.width, height: 250}}>
          <RecyclerListView
            layoutProvider={_layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={(type, animeData, index) =>
              renderList(type, animeData, index)
            }
            isHorizontal
            forceNonDeterministicRendering
            snapToAlignment={'start'}
            showsHorizontalScrollIndicator={false}
            canChangeSize
            disableIntervalMomentum={true}
          />
        </View>
      ) : null}
    </View>
  );
};

export default AnimeRecommendationsScreen;
