import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
      },
      tinyLogo: {
        height: 300,
        width: 150,
        borderRadius: 10,
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
          color: "white"
      }
})


const AnimeList = ({animeObj}) => {
  return (
    <View>
        <ImageBackground
            source={{uri: animeObj.images.jpg.image_url}}
            style={styles.tinyLogo}
        >
            <View style={styles.overlay}/>
            <View style={styles.pushTextToBottom}>
                <Text style={styles.textStyles} adjustsFontSizeToFit={true} numberOfLines={2}>
                    {animeObj.title}
                </Text>
            </View>
        </ImageBackground>
    </View>
  );
};

export default AnimeList;
