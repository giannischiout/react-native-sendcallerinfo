import {StyleSheet} from 'react-native';
import {FONTS} from '../shared/Fonts/Fonts';
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
  containerMedWidth: {
    width: '90%',
  },
  containerMedWidthFlex: {
    width: '90%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //text styles
  text: {
    color: COLORS.white,
  },
  textGrey: {
    color: COLORS.lightGrey,
  },
  textMedium: {
    color: COLORS.white,
    fontSize: 18,
    letterSpacing: 1,
  },
  textRed: {
    color: COLORS.redDark,
  },

  text22: {
    fontSize: 22,
    letterSpacing: 1,
  },
  text18: {
    color: COLORS.white,
    fontSize: 18,
    letterSpacing: 0.8,
  },
  textMediumGrey: {
    color: COLORS.darkGrey,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: FONTS.NotoLight,
  },
  textBoldGrey: {
    color: COLORS.darkGrey,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: FONTS.NotoBold,
  },
  textMediumGrey: {
    color: COLORS.darkGrey,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: FONTS.NotoMedium,
  },
  textExSm: {
    fontSize: 13,
    fontFamily: FONTS.NotoLight,
    color: COLORS.darkGrey,
  },
  textSm: {
    fontSize: 15,
  },
  textWhite: {
    color: COLORS.white,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  marginVerticalMed: {
    marginVertical: 10,
  },
  marginLeft5: {
    marginLeft: 5,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  marginTop5: {
    marginTop: 5,
  },
  marginTop10: {
    marginTop: 10,
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
