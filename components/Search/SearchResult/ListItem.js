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
  const [loader, setLoader] = useState(false)
  const callNum = num => {
    Linking.openURL(`tel:${num}`);
  };

  const closeSingle = () => {
    setExp(prev => !prev);
  };
  const ExpandableItems = () => {
    return (
      <View style={{ flex: 1 }} key={index}>
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
    <View>
      {loader ? <ActivityIndicator /> : (
        <View style={styles.itemContainer} key={index}>
          <TouchableOpacity onPress={() => closeSingle()}>
            <View style={styles.header}>
              <Text style={styles.itemStyle}> {`${index + 1}: `}</Text>
              <Text style={styles.headerName}>{item.NAME}</Text>
            </View>
          </TouchableOpacity>
          {exp && <ExpandableItems />}
          {expandAll && <ExpandableItems />}
        </View>
      )}
    </View>
  );
});


const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#f2f1f1',
    borderRadius: 5,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 2,
    height: 70,
    alignItems: 'center',

  },
  headerName: {
    flex: 1,
    flexWrap: 'wrap'
  },


  itemHeader: {
    fontFamily: FONTS.NotoMedium,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  item: {
    fontFamily: FONTS.NotoReg,
    marginLeft: 5,


  },
  callDecoration: {
    textDecorationLine: 'underline',
  },

});
