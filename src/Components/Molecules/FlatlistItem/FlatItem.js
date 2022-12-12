import React, { useState } from 'react';
import { View, Text, Linking, TouchableHighlight } from 'react-native';
import styles from './FlatlistItemStyle';
import ExandableListItem from '../../Atoms/FlatlistExpandableItem';


export const ListItem = React.memo(({ item, index }) => {
  const [exp, setExp] = useState(false);


  const closeSingle = () => {
    setExp(prev => !prev);
  };


  return (
    <View style={styles.itemContainer} key={index}>
      <TouchableHighlight underlayColor={false} onPress={() => closeSingle()}>
        <View style={!exp ? styles.header : styles.headerOpen}>
          <Text style={!exp ? styles.headerNumber : styles.headerNumberOpen} > {`${index + 1}: `}</Text>
          <Text style={!exp ? styles.headerName : styles.headerNameOpen}>{item.NAME}</Text>
        </View>
      </TouchableHighlight >

      {exp && (
        <View style={{ backgroundColor: 'white' }} key={index}>
          <ExandableListItem title={'CODE:'} item={item['CODE']} />
          <ExandableListItem title={'ADRESS:'} item={item['ADRESS']} />
          <ExandableListItem title={'PHONE:'} item={item['PHONE01']} num={item['PHONE01']} />
          <ExandableListItem title={'PHONE:'} item={item['PHONE02']} num={item['PHONE02']} />
          <ExandableListItem title={'MOBILE:'} item={item['MOBILE']} num={item['MOBILE']} />
          <ExandableListItem title={'FAX:'} item={item['FAX']} />
        </View>
      )}
    </View >
  );
});


