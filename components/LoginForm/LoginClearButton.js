import React from 'react';
import {Text} from 'react-native';
import {LoginStyles} from './loginStyles';

export const ClearButton = ({handleLogout}) => {
  return (
    <>
      <Text style={LoginStyles.clearLog} onPress={handleLogout}>
        Clear Login Data
      </Text>
    </>
  );
};
