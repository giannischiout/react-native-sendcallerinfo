import {StyleSheet} from 'react-native';
import {FONTS} from '../shared/Fonts/Fonts';
import {COLORS} from './Colors';
export const generalStyles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.bodyColor,
    alignItems: 'center',
    flex: 1,
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
  textMediumGrey: {
    color: COLORS.darkGrey,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: FONTS.NotoMedium,
  },
  textBoldGrey: {
    color: COLORS.darkGrey,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: FONTS.NotoBold,
  },

  textExSm: {
    fontSize: 13,
    fontFamily: FONTS.NotoLight,
    color: COLORS.darkGrey,
  },
  textSm: {
    fontSize: 15,
    fontFamily: FONTS.NotoLight,
  },
  textWhite: {
    color: COLORS.white,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  // marginVerticalMed: {
  //   marginVertical: 10,
  // },
  // marginLeft5: {
  //   marginLeft: 5,
  // },
  // marginLeft10: {
  //   marginLeft: 10,
  // },
  // marginTop5: {
  //   marginTop: 5,
  // },
  // marginTop10: {
  //   marginTop: 10,
  // },
  backgroundDarkGrey: {
    backgroundColor: COLORS.darkGrey,
  },

  // padding15: {
  //   padding: 15,
  // },
  // marginBottom30: {
  //   marginBottom: 30,
  // },
});
