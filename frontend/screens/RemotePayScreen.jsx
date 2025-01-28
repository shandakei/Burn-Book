import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RemotePayScreen({ navigation }) {
  const goToContacts = () => {
    navigation.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remote Payment</Text>
      <TouchableOpacity style={styles.button} onPress={goToContacts}>
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
    // backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
