import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export default function TransactionsScreen() {

  const transactions = [
    { id: '1', description: 'Sent $20 to John', amount: '-$20.00' },
    { id: '2', description: 'Received $50 from Sarah', amount: '+$50.00' },
    { id: '3', description: 'Coffee Shop', amount: '-$4.50' },
    { id: '4', description: 'Netflix Subscription', amount: '-$15.99' },
    { id: '5', description: 'Gym Membership', amount: '-$30.00' },
    { id: '6', description: 'Received $100 from Alex', amount: '+$100.00' },
    { id: '7', description: 'Grocery Shopping', amount: '-$62.80' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Wallet</Text>
  
      {/* Balance Section */}
      <View style={styles.balanceContainer} aria-label="balance-container">
        <Text style={styles.balanceLabel} aria-label="balance-label">Current Balance</Text>
        <Text style={styles.balance} aria-label="balance-amount">$125.50</Text> {/*{wallet_info}*/}
      </View>   

  
      {/* Transaction History */}
      <View aria-label="transaction-history">
        <Text style={styles.subtitle}>Recent Transactions</Text>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transaction}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>
      
    </ScrollView> 
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colours.primary,
  },
  title: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fonts.boldWeight,
    marginBottom: theme.spacing.large,
    textAlign: 'center',
    color: theme.colours.textLight, 
  },
  balanceContainer: {
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: 'rgba(255, 0, 115, 0.3)',
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.large,
  },
  balanceLabel: {
    fontSize: theme.fonts.regular,
    color: theme.colours.textLight,
    marginBottom: theme.spacing.small,
  },
  balance: {
    fontSize: theme.fonts.extraLarge,
    fontWeight: theme.fonts.boldWeight,
    color: theme.colours.textLight,
  },
  subtitle: {
    fontSize: theme.fonts.medium,
    fontWeight: theme.fonts.boldWeight,
    marginBottom: theme.spacing.medium,
    color: theme.colours.textLight,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.medium,
    backgroundColor: theme.colours.cardBackground,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.small,
    shadowColor: theme.colours.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // For Android shadows
  },
  transactionDescription: {
    fontSize: theme.fonts.regular,
    color: theme.colours.textDark, 
  },
  transactionAmount: {
    fontSize: theme.fonts.regular,
    fontWeight: theme.fonts.boldWeight,
  },
});
