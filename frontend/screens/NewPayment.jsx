import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
import theme from '../styles/theme';
import names from '../utils/names';
import { useNavigation } from '@react-navigation/native';

const defaultProfileImage = require('../assets/default-profile-image.png');

export default function NewPayment({ navigation }) {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableContacts, setAvailableContacts] = useState(names.slice(0, 10));


  const handleNext = () => {
    if (step === 1 && amount) setStep(2);
  };

  const handleFinish = () => {
    if (selectedContacts.length > 0) {
      navigation.navigate('Review', { amount, selectedContacts });
    }
  };
  

  const addContact = (contact) => {
    setSelectedContacts((prev) => [...prev, contact]);
    setAvailableContacts((prev) => prev.filter((c) => c !== contact));
  };

  const removeContact = (contact) => {
    setSelectedContacts((prev) => prev.filter((c) => c !== contact));
    setAvailableContacts((prev) => [...prev, contact]);
  };

  const filteredContacts = availableContacts.filter(contact => 
    contact.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>How much?</Text>
        </View>
        <View style={styles.inputBubbleContainer}>
          <TextInput
            style={styles.inputBubble}
            placeholder="$0.00"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            onSubmitEditing={handleNext}
          />
        </View>
        {step >= 2 && (
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>With who?</Text>
          </View>
        )}
      </View>

      {step >= 2 && selectedContacts.length > 0 && (
        <View style={styles.userBubble}>
          {selectedContacts.map((contact, index) => (
            <View key={index} style={styles.selectedContactBubble}>
              <Image source={defaultProfileImage} style={styles.profileImage} />
              <Text style={styles.contactName}>{contact}</Text>
              <TouchableOpacity onPress={() => removeContact(contact)}>
                <Text style={styles.removeIcon}>✖</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {step >= 2 && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="&#x1F50E;&#xFE0E; Search contacts..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {step >= 2 && (
        <ScrollView style={styles.contactList}>
          <FlatList
            data={filteredContacts.map((name, index) => ({ id: index.toString(), name }))}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => addContact(item.name)}
              >
                <Image source={defaultProfileImage} style={styles.profileImage} />
                <Text style={styles.contactText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}

        {step >= 2 && selectedContacts.length > 0 && (
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>DONE</Text>
        </TouchableOpacity>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colours.primary,
    padding: 20,
  },
  bubbleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  chatBubble: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  chatText: {
    fontSize: 18,
    color: '#000',
  },
  inputBubbleContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  inputBubble: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    color: '#000',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedContactBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 15,
    margin: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  contactName: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  removeIcon: {
    fontSize: 16,
    color: 'red',
  },
  searchContainer: {
    marginBottom: 10,
    border: 1,
    borderColor: 'grey'
  },
  searchInput: {
    backgroundColor: 'none',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
  contactList: {
    maxHeight: 200,
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  contactText: {
    color: '#fff',
    marginLeft: 10,
  },
  finishButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  
  finishButtonText: {
    color: '#ff69b4',
    fontWeight: 'bold',
    fontSize: 18,
  },
  
});
