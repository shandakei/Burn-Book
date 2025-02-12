import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import BackButton from '../components/BackButton';
import theme from '../styles/theme';

export default function PaySomeoneScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const openCamera = async () => {
    await requestCameraPermission();
    if (hasPermission) {
      // Add camera functionality later
      alert('Camera would open here.');
    } else {
      alert('Camera permission denied.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images], 
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Pay Someone</Text>

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose from Gallery</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.preview} />}
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
  button: {
    backgroundColor: theme.colours.primary, 
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.borderRadius.small,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colours.textLight, 
  },
  buttonText: {
    color: theme.colours.textLight, 
    fontSize: theme.fonts.medium,
    fontWeight: theme.fonts.boldWeight,
  },
  preview: {
    marginTop: theme.spacing.large,
    width: 200,
    height: 200,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colours.shadow, 
  },
});

