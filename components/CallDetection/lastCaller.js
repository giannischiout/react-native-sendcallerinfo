import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {generalStyles} from '../generalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {settingsBarNoFlex} from './SettingsBar/SettingsBar';

const data = [
  {
    name: 'dgstoft',
    number: 2105711581,
  },
  {
    name: 'giannis',
    number: 6946430846,
  },
];

export const LastCaller = ({number}) => {
  const [num, setNum] = useState(null);

  // let name = '';
  function getName() {
    for (i = 0; i < data.length; i++) {
      if (data[i].number == num) {
        return data[i].name;
      }
    }
  }

  let name = getName();

  const saveToAsync = async () => {
    if (number) {
      await AsyncStorage.setItem(
        '@number',
        JSON.stringify(number.replace('+30', '')),
      );
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
      <View style={settingsBarNoFlex.container}>
        <View style={Styles.rowFlex}>
          <Text style={generalStyles.textMediumGrey}>Last Caller:</Text>
          <CallerInfo
            name={name}
            style={generalStyles.marginLeft5}></CallerInfo>
        </View>
        <View style={Styles.container}>
          <Text
            style={{
              ...generalStyles.textExSm,
              ...generalStyles.textWhite,
              ...generalStyles.marginTop5,
            }}>
            {num ? num : number}
          </Text>
        </View>
      </View>
    </>
  );
};

export const CallerInfo = ({name}) => {
  return (
    <>
      <Text
        style={{
          ...generalStyles.text18,
          ...generalStyles.marginLeft5,
        }}>
        {name ? name : null}
      </Text>
    </>
  );
};

const Styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
