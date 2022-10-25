import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsync = async (itemName, value) => {
  try {
    let val = JSON.stringify(value);
    console.log(`value stored ${val}`);
    await AsyncStorage.setItem(itemName, val);
  } catch (e) {
    console.log('SaveToAsyncError ' + e);
  }
};
