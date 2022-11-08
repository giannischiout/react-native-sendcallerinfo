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
    borderWidth: 3,
    borderColor: '#ececec',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.thinGrey,
  },

  input: {
    height: 50,
    padding: 10,
    fontSize: 16,
    color: COLORS.darkGrey,
    flex: 1,
    fontFamily: 'NotoSans-Regular',
    letterSpacing: 0.8,
  },
  clearLog: {
    color: '#000000',
    textDecorationLine: 'underline',
    marginTop: 15,
    marginBottom: 5,
  },

  //Login Button:
  button: {
    padding: 12,
    backgroundColor: COLORS.redPrimary,
    borderRadius: 3,
    width: '100%',
    borderRadius: 30,
    elevation: 8,
    marginTop: 15,
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
    fontSize: 18,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#d4d4d4',
    padding: 5,
    borderRadius: 50,
    // elevation: 1,
  },
});
