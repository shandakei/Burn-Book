if (__DEV__) {
  const warn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (
        args[0].includes('shadow') ||
        args[0].includes('pointerEvents') ||
        args[0].includes('useNativeDriver') ||
        args[0].includes('findNode') ||
        args[0].includes('RCTAnimation') ||
        args[0].includes('findDOMNode ') 
      )
    ) {
      return;
    }
    warn(...args);
  };
}

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Platform } from 'react-native';
import theme from './styles/theme.js';

import HomeScreen from './screens/HomeScreen';
import SettleScreen from './screens/SettleScreen.jsx';
import NewPayment from './screens/NewPayment';
import Review from './screens/Review.jsx';
import EditScreen from './screens/EditScreen.jsx';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SilkScreen': require('./assets/fonts/Silkscreen-Regular.ttf'),
        'PressStart2P': require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFontsLoaded(true);

      //background color for HTML body = theme.colours.primary 
      if (Platform.OS === 'web') {
        const style = document.createElement('style');
        style.innerHTML = `body { background-color: ${theme.colours.primary}; margin: 0; }`;
        document.head.appendChild(style);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Prevents rendering until font is loaded
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settle" component={SettleScreen} />
        <Stack.Screen name="NewPayment" component={NewPayment} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="EditScreen" component={EditScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
