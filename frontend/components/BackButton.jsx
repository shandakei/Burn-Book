import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style }) => {
    const navigation = useNavigation();
  
    return (
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={[{ alignSelf: 'flex-start' }, style]} // ✅ Ensures it aligns left
        aria-label="back-button"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };
  

export default BackButton;
