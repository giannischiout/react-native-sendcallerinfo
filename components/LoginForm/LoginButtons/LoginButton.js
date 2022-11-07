import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {LoginStyles} from '../loginStyles';
export const LoginButton = ({onPressActions, text}) => {
  return (
    <>
      <TouchableOpacity style={LoginStyles.button} onPress={onPressActions}>
        <View>
          <Text style={LoginStyles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
