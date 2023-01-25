import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import {UseGetSelectedAnimePictures} from '../../common/hooks/getSelectedAnimePictures';

// const dimensionsForScreen = Dimensions.get('screen');

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    height: 50,
  },
  imageStyles: {
    height: 350,
    width: '100%',
  },
});

const SelectedAnimePics = ({animeId}) => {
  const {data, isLoading} = UseGetSelectedAnimePictures(animeId);
  let isCarousel = useRef();

  const goToNextPic = () => {
    isCarousel.snapToNext()
  }

  const goToPrevPic = () => {
    isCarousel.snapToPrev()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* UnComment for carousel */}
      {/* <TouchableOpacity onPress={goToNextPic}>
        <Text>Next Pic</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToPrevPic}>
        <Text>Prev Pic</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <Carousel
          ref={(c) => {
            isCarousel = c;
          }}
          data={data.data}
          renderItem={({item, index}) => {
            return (
              <View>
                <FastImage
                  source={{
                    uri: item.jpg.image_url,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.imageStyles}
                />
              </View>
            );
          }}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={500}
        />
      ) : (
        <View>
          <Text>No Images Available</Text>
        </View>
      )} */}
    </SafeAreaView>
  );
};

export default SelectedAnimePics;
