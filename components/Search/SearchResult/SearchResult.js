import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {generalStyles} from '../../generalStyles';
import {COLORS} from '../../Colors';
import {DisplayItem} from '../../CallDetection/lastCaller/lastCaller';
import {Linking} from 'react-native';

export const SearchResult = ({route}) => {
  console.log(route.params);
  // const payload = route.params;
  // const [data, setData] = useState(route.params);
  const {NAME, ADDRESS, CODE, PHONE01, PHONE02, MOBILE} = route.params;
  console.log(route.params.ADDRESS);
  const text = [
    'ΕΠΩΝΥΜΙΑ:',
    'ΔΙΕΥΘΥΝΣΗ:',
    'ΚΩΔΙΚΟΣ ΠΕΛΑΤΗ:',
    'ΤΗΛΕΦΩΝΟ01:',
    'ΤΗΛΕΦΩΝΟ02:',
    'MOBILE: ',
  ];
  const callNum = num => {
    Linking.openURL(`tel:${num}`);
  };
  return (
    <>
      <View style={generalStyles.body}>
        <View style={generalStyles.containerMedWidth}>
          <ScrollView>
            <View style={[Styles.container]}>
              <DisplayItem attribute={NAME} text={text[0]} />
              <DisplayItem
                margin={generalStyles.marginTop10}
                attribute={ADDRESS}
                text={text[1]}
                border={Styles.borderTop}
              />
              <DisplayItem
                margin={generalStyles.marginTop10}
                attribute={CODE}
                text={text[2]}
                border={Styles.borderTop}
              />
              <DisplayItem
                margin={generalStyles.marginTop10}
                attribute={PHONE01}
                text={text[3]}
                callNum={() => callNum(PHONE01)}
                border={Styles.borderTop}
              />
              <DisplayItem
                margin={generalStyles.marginTop10}
                attribute={PHONE02}
                text={text[4]}
                callNum={() => callNum(PHONE02)}
                border={Styles.borderTop}
              />
              <DisplayItem
                margin={generalStyles.marginTop10}
                attribute={MOBILE}
                text={text[5]}
                callNum={() => callNum(MOBILE)}
                border={Styles.borderTop}
              />
            </View>
          </ScrollView>
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
    borderBottomColor: '#f2f2f1',
    paddingBottom: 10,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#9c9a96',
    paddingTop: 10,
    marginTop: 5,
    borderStyle: 'dashed',
  },
  phone: {
    textDecorationLine: 'underline',
  },
});
