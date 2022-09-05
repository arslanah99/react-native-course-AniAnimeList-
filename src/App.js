/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './components/pages/Home/Home';
import SelectedAnimeScreen from './components/pages/SelectedAnime/SelectedAnime';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SelectedAnime" component={SelectedAnimeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
