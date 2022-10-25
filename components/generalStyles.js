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
  textRed: {
    color: COLORS.redDark,
    fontSize: 22,
  },
  text22: {
    fontSize: 22,
    letterSpacing: 1,
  },
  text18: {
    fontSize: 18,
    letterSpacing: 1,
  },
  textMediumGrey: {
    color: COLORS.lightGrey,
    fontSize: 18,
    letterSpacing: 1,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  containerMedWidth: {
    width: '90%',
  },
  marginVerticalMed: {
    marginVertical: 10,
  },
  marginLeft5: {
    marginLeft: 5,
  },
  backgroundDarkGrey: {
    backgroundColor: COLORS.darkGrey,
  },
  padding15: {
    padding: 15,
  },
  marginBottom30: {
    marginBottom: 30,
  },
});
