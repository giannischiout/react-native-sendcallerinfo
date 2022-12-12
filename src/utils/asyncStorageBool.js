import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage'
export const useBooleanAsyncStorage = (key) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    async function getValue() {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(storedValue === 'true');
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    getValue();
  }, [key]);

  function setBoolean(newValue) {
    setValue(newValue);
    AsyncStorage.setItem(key, newValue ? 'true' : 'false');
  }

  return [value, setBoolean];
}

export default useBooleanAsyncStorage;