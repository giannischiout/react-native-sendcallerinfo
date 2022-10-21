import {StyleSheet} from 'react-native';
import {COLORS} from './Colors';
export const generalStyles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.bodyColor,
    alignItems: 'center',
    flex: 1,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  text: {
    color: COLORS.white,
  },
  textMedium: {
    color: COLORS.white,
    fontSize: 18,
    letterSpacing: 1,
  },
  textMediumGrey: {
    color: COLORS.lightGrey,
    fontSize: 18,
    letterSpacing: 1,
  },
});
