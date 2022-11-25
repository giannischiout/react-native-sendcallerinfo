import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { generalStyles } from '../../generalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingsBarNoFlex } from '../SettingsBar/SettingsBar';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { UserContext } from '../../../useContext/context';

const fetchCallerInfo = async (number, soneURL) => {
  // const url = await AsyncStorage.getItem('@URL');


  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callingParty: number,
      url: soneURL,
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

export const LastCaller = ({ number }) => {
  const [num, setNum] = useState(null);
  const [data, setData] = useState('');
  const { soneURL } = useContext(UserContext);
  console.log('do we have soneULR');
  console.log(soneURL);
  const handleData = async () => {
    let res = await fetchCallerInfo(num, soneURL);
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
              generalStyles.textBoldGrey,
              generalStyles.marginLeft5,
              Styles.phone,
            ]}>
            {num ? num : number}
          </Text>
        </View>
        {/* <CallerInfo data={data}></CallerInfo> */}
        {data !== 'not found' ? <CallerInfo data={data} /> : null}
      </View>
    </>
  );
};

const CallerInfo = ({ data }) => {
  const { NAME, ADDRESS, CODE, PHONE01 } = data;
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

export const DisplayItem = ({ attribute, text, margin }) => {
  return (
    <View style={[margin]}>
      <Text style={[Styles.textHeader]}>{text}</Text>
      <Text style={Styles.text}>{attribute ? attribute : 'Not Found'}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callerInfo: {
    color: COLORS.darkGrey,
  },
  textHeader: {
    fontSize: 15,
    fontFamily: FONTS.NotoLight,
  },
  text: {
    fontSize: 13,
    fontFamily: FONTS.NotoReg,
    color: '#000',
  },
  phone: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.NotoBold,
  },
});
