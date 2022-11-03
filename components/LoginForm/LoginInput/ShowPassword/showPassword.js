import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome5';

export const ShowPass = ({bool, action}) => {
  return (
    <IconFont
      name="eye"
      style={bool ? style.eyeIconInactive : style.eyeIconActive}
      onPress={action}
    />
  );
};

const style = StyleSheet.create({
  eyeIconInactive: {
    fontSize: 18,
    marginRight: 15,
    color: '#8c8c8e',
  },
  eyeIconActive: {
    fontSize: 18,
    marginRight: 15,
    color: 'white',
  },
});
