import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import IconFont from '../../node_modules/react-native-vector-icons/FontAwesome5';
import {LoginStyles} from './loginStyles';

export const ShowPass = ({bool, action}) => {
  // console.log('bool' + bool);
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
