import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]); // State to store contacts
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Replace with your Render API endpoint
  const API_URL = 'https://your-render-backend.com/contacts';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Handle HTTP errors
        }
        const data = await response.json();
        setContacts(data); // Assuming the response is an array of contacts
      } catch (err) {
        setError(err.message); // Capture any errors
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchContacts();
  }, []);

  // Render each contact
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contact}>
      <Text style={styles.contactText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load contacts: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()} // contact.id || user.id
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contact: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
