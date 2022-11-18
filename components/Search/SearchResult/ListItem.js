import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';

export const ListItem = React.memo(({ item, index, expandAll }) => {
  const [exp, setExp] = useState(false);
  const callNum = num => {
    Linking.openURL(`tel:${num}`);
  };

  const closeSingle = () => {
    setExp(prev => !prev);
  };

  const ExpandableItems = () => {
    return (
      <View key={index}>
        <View style={styles.row}>
          <Text style={styles.itemHeader}>CODE:</Text>
          <Text style={styles.item}>{item['CODE']}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemHeader}>ADDRESS:</Text>
          <Text style={styles.item}>{item['ADDRESS']}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemHeader}>PHONE:</Text>
          <Text onPress={() => callNum(item.PHONE01)} style={[styles.item, styles.callDecoration]}>
            {item['PHONE01']}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemHeader}>PHONE:</Text>
          <Text onPress={() => callNum(item['PHONE02'])} style={[styles.item, styles.callDecoration]}>
            {item['PHONE02']}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemHeader}>MOBILE:</Text>
          <Text onPress={() => callNum(item['MOBILE'])} style={[styles.item, styles.callDecoration]}>
            {item['MOBILE']}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemHeader}>FAX:</Text>
          <Text style={styles.item}>{item['FAX']}</Text>
        </View>
      </View>
    );
  };

  return (
    <View key={index}>
      {console.log('Sigle ITEM' + index)}
      <TouchableOpacity onPress={() => closeSingle()}>
        <View style={styles.header}>
          <Text style={styles.itemStyle}> {`${index + 1}: `}</Text>
          <Text style={styles.itemStyle}>{item.NAME}</Text>
        </View>
      </TouchableOpacity>

      {exp && <ExpandableItems />}
      {expandAll && <ExpandableItems />}
    </View>
  );
});


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.thinGrey,
    marginBottom: 2,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
  },

  itemHeader: {
    fontFamily: FONTS.NotoMedium,
    color: COLORS.black,
  },
  item: {
    fontFamily: FONTS.NotoReg,
    marginLeft: 5,
  },
  callDecoration: {
    textDecorationLine: 'underline',
  },
});
