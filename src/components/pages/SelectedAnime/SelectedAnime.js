import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {UsegetSelectedAnimeInfoQuery} from '../../common/hooks/getSelectedAnimeInfoQuery';

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
    width: 50,
  },
});

const SelectedAnimeScreen = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const {data, isLoading} = UsegetSelectedAnimeInfoQuery(
    route.params.selectedAnimeObj.mal_id,
  );

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
    if (state === 'playing') {
      setPlaying(true);
    }
    if (state === 'paused') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const selectedanimeData = route.params.selectedAnimeObj;
  return (
    <View style={{backgroundColor: playing ? 'black' : 'white'}}>
      <Text>HELLO</Text>
      <Text>{selectedanimeData.title}</Text>
      <Text>{selectedanimeData.title_japanese}</Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View>
          {data.data.trailer.youtube_id ? (
            <YoutubePlayer
              height={300}
              play={playing}
              // videoId={'WD2toK5WCn0'}
              videoId={data.data.trailer.youtube_id}
              onChangeState={onStateChange}
            />
          ) : (
            <Text>Unfortunetly no trailer is Available</Text>
          )}
        </View>
      ) : (
        // <Text>
        //   {data.data.map((anime, key) => {

        //     return (
        //       <View>
        //         <Text>{anime.title}</Text>
        //       </View>
        //     );
        //   })}
        // </Text>
        <Text>Whoops No Data Available</Text>
      )}
    </View>
  );
};

export default SelectedAnimeScreen;
