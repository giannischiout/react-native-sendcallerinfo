import React, {useState} from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../Colors';
import {FONTS} from '../../../shared/Fonts/Fonts';

export const ListItem = ({item, index, expandAll}) => {
  const [exp, setExp] = useState(false);
  const callNum = num => {
    Linking.openURL(`tel:${num}`);
  };

  const closeSingle = () => {
    setExp(prev => !prev);
  };

  const ExpandableItems = () => {
    return (
      <View>
        {Object.keys(item).map((key, index) => {
          //Exclude some keys:
          if (key !== 'NAME') {
            if (key.includes('PHONE') || key.includes('MOBILE')) {
              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.itemHeader}>{`${key}:`}</Text>
                  <Text
                    onPress={() => callNum(item[key])}
                    style={[styles.item, styles.callDecoration]}>
                    {item[key]}
                  </Text>
                </View>
              );
            }

            return (
              <View key={index} style={styles.row}>
                <Text style={styles.itemHeader}>{`${key}:`}</Text>
                <Text style={styles.item}>{item[key]}</Text>
              </View>
            );
          }
        })}
      </View>
    );
  };

  return (
    <View key={index}>
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
};

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
