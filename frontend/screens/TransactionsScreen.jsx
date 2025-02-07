import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  balanceContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 0, 115, 0.3)',
    borderRadius: 8,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', 
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
