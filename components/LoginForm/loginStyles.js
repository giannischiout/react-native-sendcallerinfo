import {StyleSheet} from 'react-native';
import {Component, startTransition} from 'react';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#646465',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    color: '#8c8c8e',
    fontSize: 18,
    letterSpacing: 0.9,
    marginTop: 12,
    marginBottom: 5,
  },

  input: {
    height: 'auto',
    paddingLeft: 10,
    fontSize: 25,
    color: 'white',
    placeholderTextColor: 'white',
    flex: 1,
  },

  button: {
    marginTop: 5,
    padding: 10,
    backgroundColor: 'rgb(237,28,35)',
    borderRadius: 3,
    width: '100%',
    borderRadius: 5,
  },
  clearLog: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
  },
  icon: {
    fontSize: 25,
    color: '#8c8c8e',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
