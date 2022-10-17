import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Share} from 'react-native';
import axios from 'axios';

const SharedAnime = ({fallbackURL, animeId}) => {
  const buildLink = async () => {
    let link = await axios({
      method: 'POST',
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBWMeTQk3_9x57QesSgMAyxMjsHaOrrXIs`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://anianimelisturlprefix.page.link',
          link: fallbackURL,
          androidInfo: {
            androidPackageName: 'com.anianimelist',
          },
        },
      },
    });
    if (link.status === 200) {
      return link.data.shortLink;
    }
  };

  const shareLink = async () => {
    let shareURL;

    try {
      shareURL = await buildLink();
      console.log(shareURL);
    } catch (error) {
      console.log(error);
    }
    try {
      if (shareURL !== '') {
        await Share.share({
          message: `Here check out this cool anime bruh, ${shareURL}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          shareLink();
        }}>
        <Text>Share This Anime</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SharedAnime;
