import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Linking} from 'react-native';
import {generalStyles} from '../../generalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {settingsBarNoFlex} from '../SettingsBar/SettingsBar';
import {COLORS} from '../../Colors';

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
      console.log(data);
      return data;
    });
  try {
    if (res.result !== null) {
      return res.result;
    }
    if (res.result == null) {
      return (res.result = 'not found');
    }
  } catch (e) {
    console.log(e);
  }
};

export const LastCaller = ({number}) => {
  const [num, setNum] = useState(null);
  const [data, setData] = useState('');
  const handleData = async () => {
    let res = await fetchCallerInfo(num);
    console.log('res zero ' + res[0]);

    if (res == 'not found') {
      setData(() => res);
    } else {
      setData(() => res[0]);
    }
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
  }, [num]);

  const callNum = () => {
    num ? Linking.openURL(`tel:${num}`) : Linking.openURL(`tel:${number}`);
  };
  return (
    <>
      <View style={settingsBarNoFlex.container}>
        <View style={Styles.rowFlex}>
          <Text style={generalStyles.textMediumGrey}>Last Caller:</Text>
          <Text
            onPress={() => callNum()}
            style={[
              generalStyles.text18,
              generalStyles.marginLeft5,
              Styles.phone,
            ]}>
            {num ? num : number}
          </Text>
        </View>
        {/* <CallerInfo data={data}></CallerInfo> */}
        {data !== 'not found' ? <CallerInfo data={data}></CallerInfo> : null}
      </View>
    </>
  );
};

const CallerInfo = ({data}) => {
  const {NAME, ADDRESS, CODE, PHONE01} = data;
  const text = ['Επωνυμία:', 'Διεύθυνση:', 'Κωδικός Πελάτη:', 'Τηλέφωνο01:'];
  return (
    <>
      <View style={[Styles.container, Styles.borderTop]}>
        <DisplayItem attribute={NAME} text={text[0]} />
        <DisplayItem
          margin={generalStyles.marginTop10}
          attribute={ADDRESS}
          text={text[1]}
        />
        <DisplayItem
          margin={generalStyles.marginTop10}
          attribute={PHONE01}
          text={text[3]}
        />
        <DisplayItem
          margin={generalStyles.marginTop10}
          attribute={CODE}
          text={text[2]}
        />
      </View>
    </>
  );
};

const DisplayItem = ({attribute, text, margin}) => {
  return (
    <View style={[Styles.row, margin]}>
      <Text style={[generalStyles.textExSm, generalStyles.textGrey]}>
        {text}
      </Text>
      <Text
        style={{
          ...generalStyles.textExSm,
          ...generalStyles.textWhite,
          ...generalStyles.marginLeft10,
        }}>
        {attribute ? attribute : 'User Not Found'}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  callerInfo: {
    color: COLORS.lightGrey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#black',
    paddingBottom: 10,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 10,
    marginTop: 5,
  },
  phone: {
    textDecorationLine: 'underline',
  },
});
