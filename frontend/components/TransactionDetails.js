import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export default function TransactionDetails({ transaction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{transaction.title}</Text>
      <Text style={styles.date}>Date: {transaction.date}</Text>
      <Text style={styles.reminder}>Reminder: {transaction.reminder}</Text>
      <Text style={styles.type}>Type: {transaction.type === 'owed' ? 'Owed to you' : 'You owe'}</Text>
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
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  reminder: {
    fontSize: 16,
    marginBottom: 5,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
  },
});
