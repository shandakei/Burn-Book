import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';
import TopNav from '../components/TopNav';
import { generateDummyData } from '../utils/generateDummyData';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import logo from '../assets/logo.png';
import bin from '../assets/bin.png';
import options from '../assets/options.png';

export default function HomeScreen() {
  const [filter, setFilter] = useState('pending');
  const [transactions, setTransactions] = useState(generateDummyData(10));
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.newTransactions) {
      setTransactions((prev) => [...route.params.newTransactions, ...prev]);
    }
  }, [route.params?.newTransactions]);

  const filteredTransactions = transactions.filter(item =>
    filter === 'pending' ? item.type === 'pending' :
    filter === 'received' ? item.type === 'received' :
    item.type === 'sent'
  );

  const handleDelete = (indexToDelete) => {
    setTransactions(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleEdit = (item) => {
    navigation.navigate('EditScreen', { transaction: item });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <TopNav filter={filter} setFilter={setFilter} />

        {filteredTransactions.map((item, index) => (
          <Swipeable
            key={index}
            renderRightActions={() => (
              <View style= {{ flexDirection: 'row' }} >
                
                <TouchableOpacity 
                  onPress={() => handleEdit(item)} 
                  style={styles.optionsAction}
                >
                  <Image source={options} style={styles.optionsIcon} resizeMode="contain" />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleDelete(index)}
                  style={styles.deleteAction}
                >
                  <Image source={bin} resizeMode="contain" />
                </TouchableOpacity>
              </View>
            )}
            >
            <TouchableOpacity
              style={[styles.card, item.owedOweType === 'owed' || item.type === 'received' ? styles.owedCard : styles.oweCard]}
              onPress={() => navigation.navigate('Summary', { transaction: item })}
            >
              <Text style={[styles.globalText, styles.cardTitle, (item.owedOweType === 'owe' || item.type === 'sent') && styles.oweText]}>{item.title}</Text>
              <Text style={[styles.globalText, styles.cardDate, (item.owedOweType === 'owe' || item.type === 'sent') && styles.oweText]}>{item.date}</Text>
              {item.reminder && (
                <Text style={[styles.globalText, styles.cardReminder, (item.owedOweType === 'owe' || item.type === 'sent') && styles.oweText]}>
                  Reminders: {item.reminder}
                </Text>
              )}
            </TouchableOpacity>
          </Swipeable>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewPayment')}
      >
        <Image source={require('../assets/new-payment.png')} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colours.primary,
    maxWidth: 500,
    alignSelf: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
    padding: 16,
  },
  globalText: {
    fontSize: theme.fonts.large,
    fontFamily: theme.fonts.primary,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  card: {
    paddingTop: 12,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  owedCard: {
    backgroundColor: '#fff',
    color: '#000',
  },
  oweCard: {
    backgroundColor: '#000',
    color: '#fff',
  },
  oweText: {
    color: '#fff',
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    backgroundColor: '#fffff0 ',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabIcon: {
    width: 60,
    height: 60,
  },
  deleteAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginVertical: 5,
    borderRadius: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  optionsIcon: {
    width: 60,
    height: 60,
    tintColor: '#fff', 
    paddingRight: 60,
    },
    
});
