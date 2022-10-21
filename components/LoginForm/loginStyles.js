import {StyleSheet} from 'react-native';
import {Component, startTransition} from 'react';
import {COLORS} from '../Colors';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLORS.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    color: COLORS.lightGrey,
    fontSize: 13,
    letterSpacing: 0.9,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '200',
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
    padding: 10,
    backgroundColor: 'rgb(237,28,35)',
    borderRadius: 3,
    width: '100%',
    borderRadius: 5,
  },
  clearLog: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 15,
    marginBottom: 5,
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
    fontSize: 22,
    color: COLORS.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
