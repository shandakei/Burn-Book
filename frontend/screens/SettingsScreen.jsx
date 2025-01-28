import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ navigate }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);
  const toggleDarkMode = () => setIsDarkModeEnabled(!isDarkModeEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Manage Profile */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigate('ManageProfile')}
      >
        <Text style={styles.sectionText}>Manage Profile</Text>
      </TouchableOpacity>

      {/* Account Info */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigate('AccountInfo')}
      >
        <Text style={styles.sectionText}>Account Info</Text>
      </TouchableOpacity>

      {/* Security */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigate('Security')}
      >
        <Text style={styles.sectionText}>Security</Text>
      </TouchableOpacity>

      {/* Payment Settings */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigate('PaymentSettings')}
      >
        <Text style={styles.sectionText}>Payment Settings</Text>
      </TouchableOpacity>

      {/* Notifications Toggle */}
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Dark Mode</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  sectionButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3, // For Android shadow
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'none',
    borderRadius: 8,
    border: '1px solid white',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
