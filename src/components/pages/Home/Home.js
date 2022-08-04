import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {UseGetAllAnime} from '../../common/hooks/getAllAnimeQuery';

const HomeScreen = ({navigation}) => {
  const {data, isLoading} = UseGetAllAnime();

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        data.data.map((anime, key) => {
          return (
            <View>
              <Text>{anime.title}</Text>
            </View>
          );
        })
      ) : (
        <Text>Whoops No Data Available</Text>
      )}
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
