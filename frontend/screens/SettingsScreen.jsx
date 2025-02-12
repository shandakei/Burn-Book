import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import theme from '../styles/theme';


export default function SettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);
  const toggleDarkMode = () => setIsDarkModeEnabled(!isDarkModeEnabled);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <BackButton />

      <Text style={styles.title}>Settings</Text>

      {/* Manage Profile */}
      <TouchableOpacity style={styles.sectionButton} aria-label='settings-button'>
        <Text style={styles.sectionText}>Manage Profile</Text>
      </TouchableOpacity>


      {/* Account Info */}
      <TouchableOpacity style={styles.sectionButton} aria-label='settings-button'>
        <Text style={styles.sectionText}>Account Info</Text>
      </TouchableOpacity>

      {/* Security */}
      <TouchableOpacity style={styles.sectionButton} aria-label='settings-button'>
        <Text style={styles.sectionText}>Security</Text>
      </TouchableOpacity>

      {/* Payment Settings */}
      <TouchableOpacity style={styles.sectionButton} aria-label='settings-button'>
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Auth")}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colours.primary, 
  },
  title: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fonts.boldWeight,
    marginBottom: theme.spacing.large,
    textAlign: 'center',
    color: theme.colours.textLight, 
  },
  sectionButton: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colours.cardBackground, 
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colours.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Android shadow
  },
  sectionText: {
    fontSize: theme.fonts.medium,
    color: theme.colours.textDark, 
    fontWeight: theme.fonts.boldWeight,
  },
  button: {
    marginTop: theme.spacing.large,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colours.textLight,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: theme.fonts.medium,
    fontWeight: theme.fonts.boldWeight,
    color: theme.colours.textLight, 
  },
});
