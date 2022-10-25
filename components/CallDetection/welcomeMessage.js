import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {generalStyles} from '../generalStyles';
import AntIcon from '../../node_modules/react-native-vector-icons/AntDesign';

export const Welcome = ({company, navigation}) => {
  return (
    <>
      <View
        style={{
          ...generalStyles.containerRow,
          ...generalStyles.backgroundDarkGrey,
          ...generalStyles.padding15,
          ...generalStyles.marginBottom30,
        }}>
        <View style={styles.container}>
          <Text
            style={{
              ...generalStyles.text,
              ...generalStyles.text18,
            }}>
            WELCOME
          </Text>
          <Text
            style={{...generalStyles.textRed, ...generalStyles.marginLeft5}}>
            {company.toUpperCase()}
          </Text>
        </View>
        <View style={styles.containerEnd}>
          <TouchableOpacity>
            <AntIcon
              style={{
                ...generalStyles.text,
                ...generalStyles.text18,
              }}
              onPress={() => navigation.navigate('Login')}
              name="arrowleft"></AntIcon>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  containerEnd: {
    alignItems: 'flex-end',
    width: '50%',
  },
});
