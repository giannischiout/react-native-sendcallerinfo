import {StyleSheet} from 'react-native';
import {COLORS} from '../../Colors';
export const settingsBar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.thinGrey,
    width: '100%',

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
    marginTop: 15,
  },
});
