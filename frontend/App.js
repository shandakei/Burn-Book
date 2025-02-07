import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './styles/global.css'

import ScreenNav from './components/ScreenNav'
import PaySomeoneScreen from './screens/PaySomeoneScreen';
import ReceivePaymentScreen from './screens/ReceivePaymentScreen';
import RemotePayScreen from './screens/RemotePayScreen';
import ContactsScreen from './screens/ContactsScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createStackNavigator();

const App = () => {
  return (

      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
          <Stack.Screen name="ScreenNav" component={ScreenNav} />
          
          <Stack.Screen name="PaySomeone" component={PaySomeoneScreen} />
          <Stack.Screen name="ReceivePayment" component={ReceivePaymentScreen} />
          <Stack.Screen name="RemotePay" component={RemotePayScreen} />
          
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;


const styles = StyleSheet.create({ //refactor vs. global.css
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#de2349'
  },
});
