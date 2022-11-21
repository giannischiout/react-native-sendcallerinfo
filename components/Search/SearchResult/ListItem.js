import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';

export const ListItem = React.memo(({ item, index }) => {
  const [exp, setExp] = useState(false);
  const callNum = num => {
    Linking.openURL(`tel:${num}`);
  };

  const closeSingle = () => {
    setExp(prev => !prev);
  };

  return (
    <View style={styles.itemContainer} key={index}>
      {console.log(index)}
      {console.log('renderItem')}

      <TouchableHighlight underlayColor={false} onPress={() => closeSingle()}>
        <View style={!exp ? styles.header : styles.headerOpen}>
          <Text style={!exp ? styles.headerNumber : styles.headerNumberOpen} > {`${index + 1}: `}</Text>
          <Text style={!exp ? styles.headerName : styles.headerNameOpen}>{item.NAME}</Text>
        </View>
      </TouchableHighlight >
      {exp && <ExpandableItems item={item} index={index} callNum={callNum} />}
    </View >
  );
});



const ExpandableItems = ({ item, index, callNum }) => {
  return (
    <View style={{ backgroundColor: 'white' }} key={index}>
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
      <View style={styles.rowLast}>
        <Text style={styles.itemHeader}>FAX:</Text>
        <Text style={styles.item}>{item['FAX']}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 5,
    elevation: 1,
    borderWidth: 2,
    borderColor: '#f2f1f1',
    backgroundColor: '#f2f1f1',
  },


  //Number and Name of customer:
  header: {
    flexDirection: 'row',
    padding: 2,
    height: 70,
    alignItems: 'center',
    backgroundColor: '#f2f1f1',
    borderRadius: 5

  },
  headerOpen: {
    flexDirection: 'row',
    padding: 2,
    height: 70,
    alignItems: 'center',
    backgroundColor: COLORS.redPrimary,
    borderRadius: 5
  },

  headerNumber: {
    color: 'black',

  },
  headerNumberOpen: {
    color: 'white'
  },
  headerName: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLORS.mediumGrey,
    marginLeft: 5
  },
  headerNameOpen: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
  },

  //
  expandables: {
    height: 200,
    backgroundColor: 'red'
  },

  itemHeader: {
    fontFamily: FONTS.NotoMedium,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
    borderBottomWidth: 2,
    borderBottomColor: '#f2f1f1',
  },
  rowLast: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
  },
  item: {
    fontFamily: FONTS.NotoReg,
    marginLeft: 5,
  },
  callDecoration: {
    textDecorationLine: 'underline',
  },


});
