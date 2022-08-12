import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 500,
    width: 50
  },
});

const SelectedAnimeScreen = ({route}) => {
  const selectedanimeData = route.params.selectedAnimeObj;
  return (
    <View>
      <Text>HELLO</Text>
      <Text>{selectedanimeData.title}</Text>
      <Text>{selectedanimeData.title_japanese}</Text>
    </View>
  );
};

export default SelectedAnimeScreen;
