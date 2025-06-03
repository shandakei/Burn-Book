import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import theme from '../styles/theme';

const TopNav = ({ filter, setFilter }) => {

  const [tabMeta, setTabMeta] = useState({});
  const widthAnim = useRef(new Animated.Value(80)).current; // default width

  const indicatorAnim = useRef(new Animated.Value(0)).current;

  const tabPositions = {
    pending: 0,
    received: 1,
    sent: 2,
  };

  const handleLayout = (key) => (e) => {
    const width = e.nativeEvent.layout.width;
    const gap = 164;
    const offset = 34;    // starting position

    const x = tabPositions[key] * gap + offset;
    setTabMeta((prev) => ({ ...prev, [key]: { x, width } }));
  };

  useEffect(() => {
    if (tabMeta[filter]) {
      const { x, width } = tabMeta[filter];
      const shift = filter === 'sent' ? 14 : 0;
      const extraWidth = filter === 'sent' ? 4 : 10;

      Animated.parallel([
        Animated.timing(indicatorAnim, {
          toValue: x + shift,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.out(Easing.exp),
        }),
        Animated.timing(widthAnim, {
          toValue: width + extraWidth,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.out(Easing.exp),
        }),
      ]).start();
    }
  }, [filter, tabMeta]);


  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => setFilter('pending')}>
        <Text onLayout={handleLayout('pending')} style={styles.navText}>
          PENDING
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('received')}>
        <Text onLayout={handleLayout('received')} style={styles.navText}>
          RECEIVED
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('sent')}>
        <Text onLayout={handleLayout('sent')} style={styles.navText}>
          SENT
        </Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX: indicatorAnim }],
            width: widthAnim,
          },
        ]}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: theme.colours.primary,
    position: 'relative',
  },
  navText: {
    color: '#fff',
    fontFamily: theme.fonts.primary,
    fontSize: theme.fonts.medium,
    marginBottom: 5,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    // width: widthAnim,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginBottom: 10,
    // marginHorizontal: 6, // pushes it a bit outward on both sides
  },
  
 
});

export default TopNav;
