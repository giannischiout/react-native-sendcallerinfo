import {StyleSheet} from 'react-native';
import {Component, startTransition} from 'react';
import {COLORS} from '../Colors';
import {FONTS} from '../../shared/Fonts/Fonts';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1.2,
    borderRadius: 1,
    borderColor: COLORS.thinGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  input: {
    height: 50,
    padding: 10,
    fontSize: 18,
    color: COLORS.fontPrimary,
    placeholderTextColor: '#E6E5E7',
    flex: 1,
    fontFamily: 'NotoSans-Regular',
  },

  button: {
    padding: 12,
    backgroundColor: COLORS.redPrimary,
    borderRadius: 3,
    width: '100%',
    borderRadius: 30,
    elevation: 8,
  },
  clearLog: {
    color: '#000000',
    textDecorationLine: 'underline',
    marginTop: 15,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONTS.NotoLight,
  },
  whiteText: {
    color: 'white',
  },
  icon: {
    fontSize: 15,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: COLORS.redPrimary,
    padding: 5,
    borderRadius: 2,
  },
});
