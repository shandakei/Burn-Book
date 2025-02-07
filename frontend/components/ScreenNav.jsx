import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import ContactsScreen from '../screens/ContactsScreen'; // ✅ Import Contacts
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const ScreenNav = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Transactions') iconName = 'card-outline';
        else if (route.name === 'Contacts') iconName = 'people-outline'; // ✅ Contact icon
        else if (route.name === 'Settings') iconName = 'settings-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarStyle: { backgroundColor: '#e01d5e' },
      tabBarActiveTintColor: '#132121',
      tabBarInactiveTintColor: '#ccc',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Transactions" component={TransactionsScreen} />
    <Tab.Screen name="Contacts" component={ContactsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />

  </Tab.Navigator>
);

export default ScreenNav;
