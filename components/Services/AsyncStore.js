import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsync = async (itemName, value) => {
  await AsyncStorage.setItem(itemName, value);
};

export const getFromAsync = async itemName => {
  await AsyncStorage.getItem(itemName);
};
