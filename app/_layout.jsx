import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import { store } from 'expo-router/build/global-state/router-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
import 'react-native-reanimated';
// import Login from './login';
// Prevent the splash screen from auto-hiding before asset loading is complete.
// import index from './(tabs)';
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  return (
    // <Provider store={store}>
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="index" component={index} /> */}
      </Stack>
      <StatusBar style="auto" />
      </>
      // </Provider>
  );
}