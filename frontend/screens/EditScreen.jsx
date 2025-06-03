import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, FlatList, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '../styles/theme';
import BackButton from '../components/BackButton';
import names from '../utils/names';

// Parse UI card title
const parseTitle = (title) => {
  const match = title.match(/Owe\s\$(\d+\.\d{2})\sto\s@(\w+)\sfor\s(.+)/i);
  if (!match) return { amount: '', who: '', reason: '' };
  return {
    amount: match[1],
    who: match[2],
    reason: match[3],
  };
};

export default function EditScreen() {
  const navigation = useNavigation();
  const { transaction } = useRoute().params;

  const parsedTransaction = useMemo(() => parseTitle(transaction.title), [transaction.title]);

  const [amount, setAmount] = useState(parsedTransaction.amount);
  const [who, setWho] = useState(parsedTransaction.who);
  const [reason, setReason] = useState(parsedTransaction.reason);
  const [reminders, setReminders] = useState(!!transaction.reminder);
  const [frequency, setFrequency] = useState(transaction.frequency || 'Daily');
  const [showContacts, setShowContacts] = useState(false);
  const [availableContacts, setAvailableContacts] = useState(names.slice(0, 10));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = availableContacts.filter(contact =>
    contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>EDIT</Text>

      <View style={styles.section}>
        <Label text="How much:" />
        <Editable value={amount} setValue={setAmount} />
      </View>

      <View style={styles.section}>
        <Label text="With who:" />
        <TouchableOpacity 
          onPress={() => setShowContacts(true)}
          style={styles.inputWrapper}
        >
          <Text style={styles.inputText}>{who || 'Select a contact'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Label text="For what:" />
        <Editable value={reason} setValue={setReason} />
      </View>

      <View style={styles.section}>
        <Label text="Reminders:" />
        <Switch
          value={reminders}
          onValueChange={setReminders}
          trackColor={{ false: '#ccc', true: '#fff' }}
          thumbColor={reminders ? '#ff69b4' : '#fff'}
        />
      </View>

      <View style={styles.section}>
        <Label text="Frequency:" />
        <Picker
          selectedValue={frequency}
          style={styles.picker}
          onValueChange={setFrequency}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
        </Picker>
      </View>

      <TouchableOpacity 
        style={styles.doneButton} 
        onPress={() => {
          navigation.navigate('Home', { updatedTransaction: {
            ...transaction,
            title: `Owe $${amount} to ${who} for ${reason}`,
            reminder: reminders ? 'Yes' : '',
            frequency,
          }});
        }}
      >
        <Text style={styles.doneText}>DONE</Text>
      </TouchableOpacity>


      {/* Contacts Picker Modal */}
      <Modal visible={showContacts} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              style={styles.contactListContainer}
              data={filteredContacts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => {
                    setWho(`@${item}`);  
                    setShowContacts(false); 
                  }}
                >
                  <Text style={styles.contactText}>{item}</Text>
                </TouchableOpacity>
              )}
              
            />
            <TouchableOpacity onPress={() => setShowContacts(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;

const Editable = ({ value, setValue }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={setValue}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colours.primary,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fonts.extraLarge,
    fontFamily: theme.fonts.primary,
    color: theme.colours.textDark,
    textAlign: 'center',
    marginBottom: theme.spacing.small,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
  },
  label: {
    fontSize: theme.fonts.medium,
    fontFamily: theme.fonts.primary,
    color: theme.colours.textLight,
  },
  input: {
    fontSize: theme.fonts.medium,
    fontFamily: theme.fonts.primary,
    color: theme.colours.textDark,
    minWidth: 120,
    textAlign: 'right',
  },
  inputWrapper: {
    minWidth: 120,
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: theme.fonts.medium,
    color: theme.colours.textDark,
    textAlign: 'right',
    padding: theme.spacing.small,
    backgroundColor: theme.colours.secondary,
    borderRadius: theme.borderRadius.small,
    minWidth: 120,
  },
  picker: {
    width: 120,
    color: theme.colours.textDark,
  },
  doneButton: {
    backgroundColor: theme.colours.secondary,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    alignSelf: 'center',
    marginTop: theme.spacing.large,
  },
  doneText: {
    fontSize: theme.fonts.medium,
    fontFamily: theme.fonts.primary,
    color: theme.colours.primary,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: theme.colours.secondary,
    padding: 10,
    borderRadius: theme.borderRadius.small,
    fontSize: theme.fonts.medium,
    color: theme.colours.textDark,
    marginBottom: theme.spacing.small,
  },
  contactListContainer: {
    maxHeight: 200,
  },
  contactItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: theme.borderRadius.small,
    marginVertical: 5,
  },
  contactText: {
    color: '#fff',
    fontSize: theme.fonts.medium,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colours.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    maxHeight: '70%',
  },
  closeButton: {
    marginTop: theme.spacing.medium,
    backgroundColor: theme.colours.secondary,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colours.primary,
    fontWeight: 'bold',
  },
});
