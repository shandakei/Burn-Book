import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../styles/theme';
import BackButton from '../components/BackButton';

export default function SettleScreen({ route }) {
  const { transaction } = route.params || {}; // Ensure we avoid crashes if no params exist

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No transaction data available</Text>
      </View>
    );
  }

  const extractDetails = (text) => {
    const amountMatch = text.match(/\$(\d+(\.\d{2})?)/);
    const toMatch = text.match(/to (\S+)/);
    const forMatch = text.match(/for (.+)/);

    return {
      amount: amountMatch ? `$${amountMatch[1]}` : 'N/A',
      owedTo: toMatch ? toMatch[1] : 'N/A',
      forWhat: forMatch ? forMatch[1] : 'N/A',
    };
  };

  const { amount, owedTo, forWhat } = extractDetails(transaction.title);

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Settle</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>How much:</Text>
          <Text style={styles.value}>{amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Owed to:</Text>
          <Text style={styles.value}>{owedTo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>For what:</Text>
          <Text style={styles.value}>{forWhat}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>MARK AS PAID</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colours.primary,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    maxWidth: 500,
    alignSelf: 'center'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 20,

  },
  label: {
    fontWeight: 'bold',
    color: theme.colours.secondary,
    fontFamily: theme.fonts.primary,
  },
  value: {
    color: theme.colours.secondary,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxWidth: 194,
    maxHeight: 41,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colours.primary,
    fontFamily: theme.fonts.primary,
    fontWeight: theme.fonts.large,
  },
});
