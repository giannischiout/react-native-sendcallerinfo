import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  FlatList,
} from 'react-native';
import {generalStyles} from '../../generalStyles';
import {COLORS} from '../../Colors';
import {FONTS} from '../../../shared/Fonts/Fonts';

const Item = ({title, result, call}) => {
  const callNum = num => {
    Linking.openURL(`tel:${num}`);
  };
  return (
    <View style={Styles.itemRow}>
      <Text style={Styles.textTitle}>{title}</Text>
      <Text
        onPress={call ? () => callNum(result) : null}
        style={[Styles.text, call ? Styles.callDecoration : null]}>
        {result}
      </Text>
    </View>
  );
};

export const SearchResult = ({route}) => {
  const data = route.params;

  return (
    <>
      <View style={generalStyles.body}>
        <ScrollView style={Styles.container}>
          {data.map((obj, index) => {
            return (
              <View key={index} style={Styles.row}>
                {Object.keys(obj).map((item, index) => {
                  let text = item + ':';
                  if (item.includes('PHONE' || 'MOBILE')) {
                    return (
                      <Item
                        key={index}
                        call={true}
                        title={item + ':'}
                        result={obj[item]}
                      />
                    );
                  }
                  return <Item key={index} title={text} result={obj[item]} />;
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  row: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginTop: 5,
    width: '100%',
  },
  container: {
    width: '97%',
  },
  textTitle: {
    fontSize: 16,
    fontFamily: FONTS.NotoReg,
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.NotoBold,
  },
  itemRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callDecoration: {
    textDecorationLine: 'underline',
  },
});
