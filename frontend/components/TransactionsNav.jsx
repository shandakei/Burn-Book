import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TransactionsNav({ onSelect }) {
    
  const [activeTab, setActiveTab] = useState('All');

  const handlePress = (tab) => {
    setActiveTab(tab);
    onSelect && onSelect(tab); // Call the parent function if provided
  };

  return (
    <View style={styles.navContainer}>
      {['All', 'Pay', 'Receive'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => handlePress(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#de2349',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
