import React, {useState, useCallback} from 'react';
import {View, Text, Dimensions} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const dimensionsForScreen = Dimensions.get('screen');

const AnimeTrailerScreen = ({data, isLoading}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChanged = useCallback(state => {
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

  return (
    <View
      style={{
        backgroundColor: playing ? 'black' : 'transparent',
        height: dimensionsForScreen.height,
        width: dimensionsForScreen.width,
      }}>
      <Text>{data.data.title}</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View>
          {data.data.trailer.youtube_id ? (
            <YoutubeIframe
              height={250}
              width={dimensionsForScreen.width}
              play={playing}
              videoId={data.data.trailer.youtube_id}
              onChangeState={onStateChanged}
            />
          ) : (
            <Text>No Trailer Available</Text>
          )}
        </View>
      ) : (
        <Text>Whoops no data Available</Text>
      )}
    </View>
  );
};

export default AnimeTrailerScreen;
