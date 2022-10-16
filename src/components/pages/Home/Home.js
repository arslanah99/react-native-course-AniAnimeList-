import React, {useEffect, useCallback, useRef, useMemo} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {UseGetAllAnime} from '../../common/hooks/getAllAnimeQuery';
import AnimeList from './AnimeList';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {UseGetSelectedAnimeInfo} from '../../common/hooks/getSelectedAnimeInfoQuery';
import axios from 'axios';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    index: 2,
  },
});

const HomeScreen = ({navigation}) => {
  const {data, isLoading} = UseGetAllAnime();
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = () => {
    console.log(bottomSheetRef.current.snapToIndex(0));
    // bottomSheetRef.current.snapTo(0);
  };
  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderItem = ({item}) => <AnimeList animeObj={item} />;

  const handleDynamicLink = useCallback(
    async link => {
      // Handle dynamic link inside your own application
      if (link.url) {
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
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, [handleDynamicLink]);

  useEffect(() => {
    const fetchData = async () => {
      const getInitialLink = await dynamicLinks().getInitialLink();
      if (getInitialLink !== null) {
        if (getInitialLink.url) {
          const selectedAnimeURL = `https://api.jikan.moe/v4/anime/${
            getInitialLink.url.match(/[0-9]+/g)[0]
          }`;

          axios.get(selectedAnimeURL).then(response => {
            if (response) {
              navigation.navigate('SelectedAnime', {
                selectedAnimeObj: response.data.data,
              });
            }
          });
        }
      }
    };
    fetchData();
  }, [navigation]); // ref

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <>
            <BottomSheetModalProvider>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => openModal()}
                  style={{
                    margin: 16,
                    zIndex: 1,
                    backgroundColor: 'green',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>Open Sheet</Text>
                </TouchableOpacity>
                <FlatList
                  columnWrapperStyle={styles.columnWrapperStyle}
                  data={data.data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                />
                <BottomSheet
                  ref={bottomSheetRef}
                  index={0}
                  enablePanDownToClose
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}>
                  <View style={styles.contentContainer}>
                    <Text>Anime Recommendations</Text>
                    <BottomSheetFlatList
                      data={data.data}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      ItemSeparatorComponent={() => {
                        return (
                          <View
                            style={{
                              height: '80%',
                              width: 20,
                            }}
                          />
                        );
                      }}
                    />
                  </View>
                </BottomSheet>
              </View>
            </BottomSheetModalProvider>
          </>
        ) : (
          <Text>Whoops No Data Available</Text>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
