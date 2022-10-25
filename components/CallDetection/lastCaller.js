import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {generalStyles} from '../generalStyles';

import {saveToAsync, getFromAsync} from '../Services/AsyncStore';
export const LastCaller = ({number}) => {
  const [num, setNum] = useState(number);
  let strNumber = number.toString();
  saveToAsync('@number', strNumber);

  const handleNumber = () => {
    let numberFin = getFromAsync('@number');
    setNum(numberFin);
  };

  useEffect(() => {
    handleNumber();
  }, []);

  return (
    <>
      <Text style={generalStyles.textMediumGrey}>Last Caller:</Text>
      <Text style={generalStyles.text18}>{number}</Text>
    </>
  );
};
