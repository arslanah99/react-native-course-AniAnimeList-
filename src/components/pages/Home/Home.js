import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import {UseGetAllAnime} from '../../common/hooks/getAllAnimeQuery';
import AnimeList from './AnimeList';

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between', padding: 10
  }
})

const HomeScreen = ({navigation}) => {
  const {data, isLoading} = UseGetAllAnime();

  const renderItem = ({item}) => <AnimeList animeObj={item}/>
  
  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <FlatList 
        columnWrapperStyle={styles.columnWrapperStyle}
          data={data.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
        // <Text>
        //   {data.data.map((anime, key) => {
        //     return (
        //       <View>
        //         <Text>{anime.title}</Text>
        //       </View>
        //     );
        //   })}
        // </Text>
      ) : (
        <Text>Whoops No Data Available</Text>
      )}
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
