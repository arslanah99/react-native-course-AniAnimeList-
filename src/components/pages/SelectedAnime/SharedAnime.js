import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';

const dimensionsForScreen = Dimensions.get('screen');

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    height: dimensionsForScreen.height,
  },
});

const SharedAnime = ({fallbackURL, animeId}) => {
  const buildLink = async () => {
    try {
      let link = await axios({
        method: 'POST',
        url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBWMeTQk3_9x57QesSgMAyxMjsHaOrrXIs`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          dynamicLinkInfo: {
            domainUriPrefix: 'https://anianimelist.page.link',
            link: `${fallbackURL}`,
            androidInfo: {
              androidPackageName: 'com.anianimelist',
            },
          },
        },
      });
      if (link.status === 200) {
        return link.data.shortLink;
      }
      return link.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async () => {
    let shareURL;
    try {
      shareURL = await buildLink();
      console.log(shareURL);
    } catch (error) {
      console.log(error);
    }
    try {
      if (shareURL !== '') {
        const result = await Share.share({
          message: `Here check out this cool anime bruh, ${shareURL}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {console.log(fallbackURL)}
      <TouchableOpacity onPress={onShare}>
        <Icon name="share" size={30} color="black"/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SharedAnime;
