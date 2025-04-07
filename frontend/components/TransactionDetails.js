import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export default function TransactionDetails({ route }) {
  const { transaction } = route.params || {}; // Ensure transaction is properly extracted

  if (!transaction) {
    console.log("TransactionDetails: no data received")
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No transaction data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{transaction.title}</Text>
      <Text style={styles.date}>Date: {transaction.date}</Text>
      <Text style={styles.reminder}>Reminder: {transaction.reminder}</Text>
      <Text style={styles.type}>Type: 
        {transaction.type === 'received' ? 'Received' : 
         transaction.type === 'sent' ? 'Sent' : 'Pending'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colours.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colours.textLight,
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colours.textLight,
  },
  reminder: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colours.textLight,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colours.accent,
  },
});
