import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../styles/theme';

const TopNav = ({ filter, setFilter }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => setFilter('all')}>
        <Text style={[styles.navText, filter === 'all' && styles.activeText]}>ALL</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter('owed')}>
        <Text style={[styles.navText, filter === 'owed' && styles.activeText]}>OWED</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter('owe')}>
        <Text style={[styles.navText, filter === 'owe' && styles.activeText]}>OWE</Text>
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
