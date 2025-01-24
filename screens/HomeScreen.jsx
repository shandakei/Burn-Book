import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


export default function HomeScreen({ navigate }) {
  
  return (
    <ScrollView>
      {/* Profile Section */}
      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8' }}
          style={styles.profileImg}
        />
        <Text style={styles.welcomeText}>Welcome, [User]!</Text>
      </View>

      {/* QR Code Section */}
      <View style={styles.qrSection}>
        <Image
          source={{ uri: 'https://as1.ftcdn.net/jpg/05/94/36/64/1000_F_594366491_I3vaOX6ZasBJsZNfuNErXASCcpcsQ1Co.jpg' }}
          style={styles.qrCode}
        />
        <Text style={styles.qrText}>Connect with friends!</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigate('PaySomeone')}>
          <Text style={styles.btnText}>Pay Someone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigate('ReceivePayment')}>
          <Text style={styles.btnText}>Receive Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigate('RemotePay')}>
          <Text style={styles.btnText}>Remote Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  profile: {
    alignItems: 'center',
    marginTop: 10, 
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5, 
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  qrSection: {
    alignItems: 'center', 
    width: '100%', 
    marginVertical: 10,
  },
  qrCode: {
    width: screenWidth * 0.6, 
    height: screenWidth * 0.6, 
    borderRadius: 16,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#ccc', 
  },
  
  qrText: {
    fontSize: 16,
    color: '#fff',
  },
  actionButtons: {
    width: '100%',
    marginTop: 10,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#cbd1d6',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
