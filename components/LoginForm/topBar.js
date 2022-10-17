import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

export const TopBar = () => {
  return (
    <View style={styles.TopBar}>
      <Image
        style={styles.Image}
        source={require('../../assets/imgs/dgsoft.png')}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  TopBar: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
  },
  Image: {
    width: 120,
    height: 40,
  },
});
