/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const AppComponent = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </QueryClientProvider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => AppComponent);
