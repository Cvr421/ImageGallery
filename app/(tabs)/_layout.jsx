import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function TabLayout() {
  // const colorScheme = useColorScheme();
  return (
    <Tabs
    screenOptions={{
      tabBarStyle: Platform.select({
        ios: {
          // Use a transparent background on iOS to show the blur effect
          position: 'absolute',
        },
        default: {},
      }),
    }}
    
    
    
    
    
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ImageGallery',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color="black" size={size} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color="black" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}