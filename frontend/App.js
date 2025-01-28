import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, Dimensions, ScrollView } from 'react-native';

import './styles/global.css'
import { LinearGradient } from 'expo-linear-gradient';

import ScreenNav from './components/ScreenNav';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import SettingsScreen from './screens/SettingsScreen';
import PaySomeoneScreen from './screens/PaySomeoneScreen';
import ReceivePaymentScreen from './screens/ReceivePaymentScreen';
import RemotePayScreen from './screens/RemotePayScreen';
import ContactsScreen from './screens/ContactsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home'); //change to ('Sign in') || ('Home')

  const pages = {
    Home: <HomeScreen />,
    Wallet: <WalletScreen />,
    Settings: <SettingsScreen />,
    PaySomeone: <PaySomeoneScreen />,
    ReceivePayment: <ReceivePaymentScreen />,
    RemotePay: <RemotePayScreen />,
    Contacts: <ContactsScreen />,
  };  

  const renderScreen = () =>
    pages[currentScreen] || <Text>Error: Screen not found. Please refresh the app.</Text>;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const appWidth = Math.min(screenWidth, 1000); // ! - reduce to 480
  const navHeight = 60; 

  return (
    
      <LinearGradient colors={['#000000', '#ff007f']} style={[styles.container, { width: appWidth }]}>
      <StatusBar style="auto" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: navHeight },
        ]}
      >
        {currentScreen === 'Home' ? (
          <HomeScreen navigate={setCurrentScreen} /> 
        ) : (
          renderScreen()
        )}
      </ScrollView>

      <ScreenNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cf0000',
    justifyContent: 'space-between',
    alignSelf: 'stretch', 
    minHeight: Dimensions.get('window').height,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
