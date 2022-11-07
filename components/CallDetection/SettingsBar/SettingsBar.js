import {StyleSheet} from 'react-native';
import {COLORS} from '../../Colors';
import {FONTS} from '../../../shared/Fonts/Fonts';
export const settingsBar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.thinGrey,
    width: '100%',

    // borderRadius: 3,
    // borderLeftColor: COLORS.redPrimary,
    // borderLeftWidth: 2,
    marginTop: 15,
    borderRadius: 2,
    padding: 15,
  },
});
export const settingsBarNoFlex = StyleSheet.create({
  container: {
    backgroundColor: COLORS.thinGrey,
    width: '100%',
    padding: 10,
    borderRadius: 3,
    // borderLeftColor: COLORS.redPrimary,
    // borderLeftWidth: 2,
    marginTop: 15,
  },
});
