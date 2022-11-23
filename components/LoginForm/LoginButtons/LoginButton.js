import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, StyleSheet, } from 'react-native';



import { LoginStyles } from '../loginStyles';


export const LoginButton = props => {
  const Spinner = () => {
    return (
      <View style={Styles.container}>
        <ActivityIndicator style={Styles.spinner} size="large" color="#fff" />
      </View>
    );
  };
  return (
    <>
      <TouchableOpacity
        style={LoginStyles.button}
        onPress={props.onPressActions}>
        <View>
          {props.loading ? (
            <Spinner />
          ) : (
            <Text style={LoginStyles.buttonText}>{props.text}</Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 5,
    marginTop: 2,
  },
});
