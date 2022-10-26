import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {generalStyles} from '../generalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LastCaller = ({number}) => {
  const [num, setNum] = useState(null);
  const saveToAsync = async () => {
    if (number) {
      await AsyncStorage.setItem('@number', JSON.stringify(number));
    }
  };
  saveToAsync();

  handleNumber = async () => {
    try {
      const jsonString = await AsyncStorage.getItem('@number');
      const value = await JSON.parse(jsonString);
      console.log(`handlenumber value: ${value}`);
      if (value !== null) {
        setNum(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleNumber();
  }, [number, num]);

  return (
    <>
      <Text style={generalStyles.textMediumGrey}>Last Caller:</Text>
      <Text style={generalStyles.text18}>{num ? num : number}</Text>
    </>
  );
};
