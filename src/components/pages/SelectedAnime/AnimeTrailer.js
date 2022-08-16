import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const dimensionsForScreen = Dimensions.get('screen');

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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
        height: 250,
        width: dimensionsForScreen.width,
      }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View style={styles.centerContent}>
              <Text>{data.data.title}</Text>
          {data.data.trailer.youtube_id ? (
            <>
              <YoutubeIframe
                height={250}
                width={dimensionsForScreen.width}
                play={playing}
                videoId={data.data.trailer.youtube_id}
                onChangeState={onStateChanged}
              />
            </>
          ) : (
            <View >
              <ImageBackground
                source={{uri: data.data.images.jpg.image_url}}
                style={styles.tinyLogo}
              />
            </View>
          )}
        </View>
      ) : (
        <Text>Whoops no data Available</Text>
      )}
    </View>
  );
};

export default AnimeTrailerScreen;
