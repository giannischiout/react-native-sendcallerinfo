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
    padding: 10,
  },
  Image: {
    width: 100,
    height: 30,
  },
});
