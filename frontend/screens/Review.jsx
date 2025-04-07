import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, StyleSheet } from 'react-native';
import theme from '../styles/theme';

const defaultProfileImage = require('../assets/default-profile-image.png');

export default function Review({ route, navigation }) {
  const { amount, selectedContacts } = route.params;
  const perPerson = (amount / selectedContacts.length).toFixed(2);

  const handleDone = () => {
    const newTransactions = selectedContacts.map(contact => ({
      title: `$${perPerson} to @${contact}`,
      date: new Date().toLocaleDateString(),
      type: 'sent',
    }));

    navigation.navigate('Home', { newTransactions: newTransactions.reverse() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REVIEW</Text>
      <FlatList
        data={selectedContacts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <Image source={defaultProfileImage} style={styles.profileImage} />
            <Text style={styles.contactName}>{item}</Text>
            <TextInput
              style={styles.amountInput}
              defaultValue={`$${perPerson}`}
              keyboardType="numeric"
            />
            <TouchableOpacity>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff69b4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contactName: {
    flex: 1,
    fontSize: 18,
    color: '#000',
  },
  amountInput: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
    width: 80,
    textAlign: 'right',
  },
  editIcon: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  doneButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
  },
  doneButtonText: {
    color: '#ff69b4',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
