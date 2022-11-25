import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { generalStyles } from '../../generalStyles';
import { settingsBarNoFlex } from '../SettingsBar/SettingsBar';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { UserContext } from '../../../useContext/context';

const fetchCallerInfo = async (number, soneURL) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callingParty: number,
      url: soneURL,
    }),
  };
  console.log('----------------------------------------------------')
  console.log(requestOptions.body)



  const res = await fetch(
    'https://ccmde1.cloudon.gr/softone/soneCustomer.php',
    requestOptions,
  )
    .then(response => response.json())
    .then(data => {
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

export const LastCaller = () => {
  // const [num, setNum] = useState(null);
  const [data, setData] = useState('');
  const { soneURL, number } = useContext(UserContext);



  const handleData = async () => {
    let res = await fetchCallerInfo(number, soneURL);
    if (res == 'not found') {
      setData(() => res);
    } else {
      setData(() => res[0]);
    }
  };


  useEffect(() => {
    handleData();
  }, [number]);

  const callNum = () => { Linking.openURL(`tel:${number}`) };
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
            {number}
          </Text>
        </View>
        {data !== 'not found' ? <CallerInfo data={data} /> : null}
      </View>
    </>
  );
};

const CallerInfo = ({ data }) => {
  const { NAME, ADDRESS, CODE, PHONE01 } = data;
  return (
    <>
      <View style={[Styles.container, Styles.borderTop]}>
        <DisplayItem attribute={NAME} text={'Επωνυμία:'} />
        <DisplayItem
          margin={generalStyles.marginTop10}
          attribute={ADDRESS}
          text={'Διεύθυνση:'}
        />
        <DisplayItem
          margin={generalStyles.marginTop10}
          attribute={PHONE01}
          text={'Κωδικός Πελάτη:'}
        />
        <DisplayItem
          margin={generalStyles.marginTop10}
          attribute={CODE}
          text={'Τηλέφωνο:'}
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
