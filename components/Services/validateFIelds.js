import {Alert} from 'react-native';
export const pop_Alert = message => {
  {
    Alert.alert('Error Message', `${message}`);
  }
};
