import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function WalletScreen() {
  
  const transactions = [ //replace with db data
    { id: '1', description: 'Sent $20 to John', amount: '-$20.00' },
    { id: '2', description: 'Received $50 from Sarah', amount: '+$50.00' },
    { id: '3', description: 'Coffee Shop', amount: '-$4.50' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallet</Text>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balance}>$125.50</Text>
      </View>

      {/* Transaction History */}
      <Text style={styles.subtitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  balanceContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 0, 115, 0.3)', 
    borderRadius: 8,
    // border: 1,
    // borderColor: 'rgba(255, 255, 255, 1)',
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
    color: 'white'
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
