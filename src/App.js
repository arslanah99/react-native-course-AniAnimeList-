/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './components/pages/Home/Home';
import SelectedAnimeScreen from './components/pages/SelectedAnime/SelectedAnime';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SelectedAnime" component={SelectedAnimeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
