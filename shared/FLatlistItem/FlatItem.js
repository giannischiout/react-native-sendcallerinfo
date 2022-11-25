import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Linking,
  TouchableHighlight,
} from 'react-native';
import { styles } from './FlatItemStyle';



export const ListItem = React.memo(({ item, index }) => {
  const [exp, setExp] = useState(false);


  const closeSingle = () => {
    setExp(prev => !prev);
  };

  const callNum = num => {
    Linking.openURL(`tel:${num}`);
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


