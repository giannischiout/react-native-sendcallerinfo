import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {LoginStyles} from '../loginStyles';

export const ClearButton = ({handleLogout}) => {
  return (
    <>
      <Text style={[LoginStyles.clearLog, Styles.text]} onPress={handleLogout}>
        Clear Login Data
      </Text>
    </>
  );
};

const Styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
