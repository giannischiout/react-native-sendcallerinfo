import {StyleSheet} from 'react-native';
import {COLORS} from './Colors';
export const generalStyles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.bodyColor,
    justifyContent: 'center',
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
});
