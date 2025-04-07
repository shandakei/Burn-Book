import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../styles/theme';

const TopNav = ({ filter, setFilter }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => setFilter('pending')}>
        <Text style={[styles.navText, filter === 'pending' && styles.activeText]}>PENDING</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter('received')}>
        <Text style={[styles.navText, filter === 'received' && styles.activeText]}>RECEIVED</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter('sent')}>
        <Text style={[styles.navText, filter === 'sent' && styles.activeText]}>SENT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: theme.colours.primary,
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeText: {
    textDecorationLine: 'underline',
  },
});

export default TopNav;
