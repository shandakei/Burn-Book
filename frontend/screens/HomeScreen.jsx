import React, { useState } from 'react';
import { ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import TopNav from '../components/TopNav';
import { generateDummyData } from '../utils/generateDummyData';
import logo from '../assets/logo.png';

export default function HomeScreen({ navigation }) {
  const [filter, setFilter] = useState('all');
  const transactions = generateDummyData(10);
  
  const filteredTransactions = transactions.filter(item => 
    filter === 'all' ? true : filter === 'owed' ? item.type === 'owed' : item.type === 'owe'
  );

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      
      <TopNav filter={filter} setFilter={setFilter} />

      {filteredTransactions.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.card, item.type === 'owed' ? styles.owedCard : styles.oweCard]} 
          onPress={() => navigation.navigate('Summary', { transaction: item })}>
          <Text style={[styles.globalText, styles.cardTitle, item.type === 'owe' && styles.oweText]}>{item.title}</Text>
          <Text style={[styles.globalText, styles.cardDate, item.type === 'owe' && styles.oweText]}>{item.date}</Text>
          <Text style={[styles.globalText, styles.cardReminder, item.type === 'owe' && styles.oweText]}>Reminders: {item.reminder}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colours.primary,
    paddingBottom: 20,
  },
  globalText: {  // ✅ Apply font globally
    fontSize: theme.fonts.medium,
    fontFamily: theme.fonts.primary,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  owedCard: {
    backgroundColor: '#fff',
  },
  oweCard: {
    backgroundColor: '#000',
  },
  oweText: {
    color: '#fff', // ✅ Ensures white text on black background
  },  
  cardTitle: {
    fontSize: 16,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
  },
  cardReminder: {
    fontSize: 12,
    color: '#888',
  },
});
