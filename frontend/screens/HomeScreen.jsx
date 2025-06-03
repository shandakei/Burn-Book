import React, { useState, useEffect, useRef } from 'react';
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
  const [transactions, setTransactions] = useState([]);
  const [activeSwipeIndex, setActiveSwipeIndex] = useState(null);
  const [cardHeights, setCardHeights] = useState({});
  const swipeableRefs = useRef({});
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.newTransactions) {
      setTransactions((prev) => [...route.params.newTransactions, ...prev]);
    }

    if (route.params?.updatedTransaction) {
      setTransactions((prev) =>
        prev.map((item) =>
          item.date === route.params.updatedTransaction.date
            ? route.params.updatedTransaction
            : item
        )
      );
    }
  }, [route.params?.newTransactions, route.params?.updatedTransaction]);

  useEffect(() => {
    if (transactions.length === 0) {
      setTransactions(generateDummyData(30));
    }
  }, []);

  const filteredTransactions = transactions.filter((item) =>
    filter === 'pending'
      ? item.type === 'pending'
      : filter === 'received'
      ? item.type === 'received'
      : item.type === 'sent'
  );

  const handleDelete = (indexToDelete) => {
    setTransactions((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleEdit = (item) => {
    navigation.navigate('EditScreen', { transaction: item });
  };

  const handleCardLayout = (event, index) => {
    const { height } = event.nativeEvent.layout;
    setCardHeights(prev => ({ ...prev, [index]: height }));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <TopNav filter={filter} setFilter={setFilter} />

        {filteredTransactions.map((item, index) => (
          (item.owedOweType === 'owed' || item.type === 'received') ? (
            <Swipeable
              key={index}
              ref={ref => { swipeableRefs.current[index] = ref; }}
              onSwipeableOpen={() => {
                if (activeSwipeIndex !== null && activeSwipeIndex !== index && swipeableRefs.current[activeSwipeIndex]) {
                  swipeableRefs.current[activeSwipeIndex].close();
                }
                setActiveSwipeIndex(index);
              }}
              onSwipeableClose={() => setActiveSwipeIndex(null)}
              renderRightActions={() => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => handleEdit(item)}
                    style={[styles.optionsAction, { height: cardHeights[index] || 90 }]}
                  >
                    <Image source={options} style={styles.optionsIcon} resizeMode="contain" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(index)}
                    style={[styles.deleteAction, { height: cardHeights[index] || 90 }]}
                  >
                    <Image source={bin} style={styles.optionsIcon} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              )}
            >
              <TouchableOpacity
                onLayout={(e) => handleCardLayout(e, index)}
                style={[
                  styles.card,
                  styles.owedCard,
                  {
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: activeSwipeIndex === index ? 0 : 10,
                    borderBottomRightRadius: activeSwipeIndex === index ? 0 : 10
                  },
                ]}
                activeOpacity={1}
              >
                <Text style={[styles.globalText, styles.cardTitle]}>{item.title}</Text>
                <Text style={[styles.globalText, styles.cardDate]}>{item.date}</Text>
                {item.reminder && (
                  <Text style={[styles.globalText, styles.cardReminder]}>
                    Reminders: {item.reminder}
                  </Text>
                )}
              </TouchableOpacity>
            </Swipeable>
          ) : (
            <TouchableOpacity
              key={index}
              style={[styles.card, styles.oweCard, { borderRadius: 10 }]}
              onPress={() => navigation.navigate('Settle', { transaction: item })}
            >
              <Text style={[styles.globalText, styles.cardTitle, styles.oweText]}>{item.title}</Text>
              <Text style={[styles.globalText, styles.cardDate, styles.oweText]}>{item.date}</Text>
              {item.reminder && (
                <Text style={[styles.globalText, styles.cardReminder, styles.oweText]}>
                  Reminders: {item.reminder}
                </Text>
              )}
            </TouchableOpacity>
          )
        ))}
      </ScrollView>

      <View style={styles.fabWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('NewPayment')}>
          <Image source={require('../assets/new-payment.png')} style={styles.fabIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: theme.colours.primary,
    height: '100vh',
    maxWidth: 500,
    alignSelf: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
    padding: 16,
  },
  globalText: {
    fontSize: theme.fonts.medium,
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
    paddingTop: 10,
    color: '#666',
  },
  cardReminder: {
    fontSize: 12,
    color: '#888',
  },
  fabWrapper: {
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
    zIndex: 1000,
  },
  fabIcon: {
    width: 60,
    height: 60,
  },
  optionsAction: {
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  deleteAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  optionsIcon: {
    width: 24,
    height: 24,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
