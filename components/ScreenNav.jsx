import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function ScreenNav({ currentScreen, onNavigate }) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => onNavigate('Home')}>
        <Icon
          name="home" 
          size={28}
          color={currentScreen === 'Home' ? '#132121' : '#ccc'} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Wallet')}>
        <Icon
          name="wallet" 
          size={28}
          color={currentScreen === 'Wallet' ? '#132121' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Settings')}>
        <Icon
          name="settings" 
          size={28}
          color={currentScreen === 'Settings' ? '#132121' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e01d5e',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#bbb',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});
