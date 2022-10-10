import {StyleSheet} from 'react-native';
import {Component} from 'react';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 'auto',
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#d6d6d6',
    padding: 10,
    fontSize: 25,
    color: 'white',
    placeholderTextColor: 'white',
  },

  button: {
    margin: 12,
    padding: 10,
    backgroundColor: '#00a8ff',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
  },
});
