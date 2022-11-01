import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {generalStyles} from '../generalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {settingsBarNoFlex} from './SettingsBar/SettingsBar';
import {COLORS} from '../Colors';

const fetchCallerInfo = async number => {
  console.log(`fetch  number ${number}`);
  const url = await AsyncStorage.getItem('@URL');
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      callingParty: number,
      url: url,
    }),
  };

  const res = await fetch(
    'https://ccmde1.cloudon.gr/softone/soneCustomer.php',
    requestOptions,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
  if (res.result !== null) {
    return res.result;
  }
};

export const LastCaller = ({number}) => {
  const [num, setNum] = useState(null);
  const [name, setName] = useState('');

  const handleData = async () => {
    let res = await fetchCallerInfo(num);
    console.log(res[0]['NAME']);
    setName(() => res[0]['NAME']);
    // setData(res);
  };

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

  useEffect(() => {
    handleData();
  }, [name, num]);

  return (
    <>
      <View style={settingsBarNoFlex.container}>
        <View style={Styles.rowFlex}>
          <Text style={generalStyles.textMediumGrey}>Last Caller:</Text>
          <Text style={[generalStyles.text18, generalStyles.marginLeft5]}>
            {num ? num : number}
          </Text>
        </View>
        <View style={Styles.container}>
          <CallerInfo
            name={name}
            style={[
              generalStyles.textExSm,
              generalStyles.textWhite,
            ]}></CallerInfo>
        </View>
      </View>
    </>
  );
};

export const CallerInfo = ({name}) => {
  return (
    <>
      <View style={Styles.row}>
        <Text style={[generalStyles.textExSm, generalStyles.textGrey]}>
          Eπωνυμία:
        </Text>
        <Text
          style={{
            ...generalStyles.textExSm,
            ...generalStyles.textWhite,
            ...generalStyles.marginLeft10,
          }}>
          {name ? name : 'User Not Found'}
        </Text>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  callerInfo: {
    color: COLORS.lightGrey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
