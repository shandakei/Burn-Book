import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TransactionDetails from '../components/TransactionDetails';

export default function DetailsScreen({ route }) {
  const { transaction } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TransactionDetails transaction={transaction} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
