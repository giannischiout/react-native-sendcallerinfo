import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {generalStyles} from '../../generalStyles';
import {COLORS} from '../../Colors';
import {DisplayItem} from '../../CallDetection/lastCaller/lastCaller';

export const SearchResult = ({route}) => {
  console.log(route.params);
  // const payload = route.params;
  // const [data, setData] = useState(route.params);
  const {NAME, ADDRESS, CODE, PHONE01} = route.params;
  const text = ['Επωνυμία:', 'Διεύθυνση:', 'Κωδικός Πελάτη:', 'Τηλέφωνο01:'];
  return (
    <>
      <View style={generalStyles.body}>
        <View style={generalStyles.containerMedWidth}>
          <View style={[Styles.container, Styles.borderTop]}>
            <DisplayItem attribute={NAME} text={text[0]} />
            <DisplayItem
              margin={generalStyles.marginTop10}
              attribute={ADDRESS}
            />
            <DisplayItem
              margin={generalStyles.marginTop10}
              attribute={PHONE01}
              text={text[1]}
            />
            <DisplayItem
              margin={generalStyles.marginTop10}
              attribute={CODE}
              text={text[2]}
            />
          </View>
        </View>
      </View>
    </>
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
