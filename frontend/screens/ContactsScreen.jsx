import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import BackButton from '../components/BackButton';

const contacts = [
  { id: '1', name: 'Alice Johnson', image: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'Bob Smith', image: 'https://i.pravatar.cc/100?img=2' },
  { id: '3', name: 'Charlie Brown', image: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', name: 'Daisy Parker', image: 'https://i.pravatar.cc/100?img=4' },
  { id: '5', name: 'Ethan Carter', image: 'https://i.pravatar.cc/100?img=5' },
  { id: '6', name: 'Fiona Blake', image: 'https://i.pravatar.cc/100?img=6' },
  { id: '7', name: 'George Hall', image: 'https://i.pravatar.cc/100?img=7' },
  { id: '8', name: 'Hannah Rose', image: 'https://i.pravatar.cc/100?img=8' },
  { id: '9', name: 'Ian Foster', image: 'https://i.pravatar.cc/100?img=9' },
  { id: '10', name: 'Jessica Lee', image: 'https://i.pravatar.cc/100?img=10' },
  { id: '11', name: 'Kevin White', image: 'https://i.pravatar.cc/100?img=11' },
  { id: '12', name: 'Laura Adams', image: 'https://i.pravatar.cc/100?img=12' },
  { id: '13', name: 'Mike Thompson', image: 'https://i.pravatar.cc/100?img=13' },
  { id: '14', name: 'Nina Green', image: 'https://i.pravatar.cc/100?img=14' },
  { id: '15', name: 'Oliver Scott', image: 'https://i.pravatar.cc/100?img=15' },
  { id: '16', name: 'Paula King', image: 'https://i.pravatar.cc/100?img=16' },
  { id: '17', name: 'Quincy Bell', image: 'https://i.pravatar.cc/100?img=17' },
  { id: '18', name: 'Rachel Moore', image: 'https://i.pravatar.cc/100?img=18' },
  { id: '19', name: 'Sam Walker', image: 'https://i.pravatar.cc/100?img=19' },
  { id: '20', name: 'Tina Nelson', image: 'https://i.pravatar.cc/100?img=20' },
];

const ContactsScreen = () => {
  return (
    <ScrollView style={styles.container} aria-label="contacts-list">

      <BackButton />

      <Text style={styles.title}>Your Contacts</Text>

      {contacts.map((contact) => (
        <View key={contact.id} style={styles.contactItem} aria-label="contact-item">
          <Image source={{ uri: contact.image }} style={styles.profileImage} aria-label="contact-image" />
          <Text style={styles.contactName} aria-label="contact-name">{contact.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
