import {Alert} from 'react-native';
export const Validate_fields = (username, password, company) => {
  if (username === '' || password === '' || company === '') {
    Alert.alert('Error Message', 'Empty Fields');
  }
};
