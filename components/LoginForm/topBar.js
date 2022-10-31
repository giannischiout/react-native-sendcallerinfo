import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../Colors';

export const TopBar = () => {
  return (
    <View style={styles.TopBar}>
      <Image
        style={styles.Image}
        source={require('../../assets/imgs/ccm.png')}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  TopBar: {
    backgroundColor: COLORS.darkGrey,
    width: '100%',
    padding: 15,
  },
  Image: {
    width: 100,
    height: 30,
  },
});
