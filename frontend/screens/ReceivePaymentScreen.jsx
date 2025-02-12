import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BackButton from '../components/BackButton';
import theme from '../styles/theme';

export default function ReceivePaymentScreen() {
  return (
    <View style={styles.container}>

      <BackButton />

      <Text style={styles.title}>Your Payment QR Code</Text>
      <Image
        source={{ uri: 'https://as1.ftcdn.net/jpg/05/94/36/64/1000_F_594366491_I3vaOX6ZasBJsZNfuNErXASCcpcsQ1Co.jpg' }}
        style={styles.qrCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colours.primary, 
    padding: theme.spacing.medium, 
  },
  title: {
    fontSize: theme.fonts.large,
    fontWeight: theme.fonts.boldWeight,
    marginBottom: theme.spacing.large,
    color: theme.colours.textLight, 
    textAlign: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: theme.colours.textLight, 
    borderRadius: theme.borderRadius.medium,
  },
});