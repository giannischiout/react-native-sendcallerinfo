import {StyleSheet} from 'react-native';
import {COLORS} from '../../Colors';

export const settingsBar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.darkGrey,
    width: '100%',
    padding: 10,
    borderRadius: 3,
    borderLeftColor: COLORS.redPrimary,
    borderLeftWidth: 2,
    marginTop: 15,
  },
});
