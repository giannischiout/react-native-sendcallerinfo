import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const NavStyle = () => {
  return (
    <View style={Styles.header}>
      <Text>CCM</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    color: 'white',
    backgroundColor: '#121212',
  },
});
