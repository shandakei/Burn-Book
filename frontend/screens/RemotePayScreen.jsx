import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import theme from '../styles/theme';


export default function RemotePayScreen() {
  const navigation = useNavigation(); // 

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Remote Payment</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contacts')}>
        <Text style={styles.buttonText}>Select Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colours.primary, 
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fonts.boldWeight,
    marginBottom: theme.spacing.large,
    color: theme.colours.textLight,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colours.primary, 
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.borderRadius.small,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colours.textLight, 
  },
  buttonText: {
    color: theme.colours.textLight, 
    fontSize: theme.fonts.medium,
    fontWeight: theme.fonts.boldWeight,
  },
});