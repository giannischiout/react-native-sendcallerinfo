import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {generalStyles} from '../../generalStyles';
import {COLORS} from '../../Colors';

export const Welcome = ({company}) => {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            ...generalStyles.textGrey,
            ...generalStyles.textExSm,
          }}>
          USER:
        </Text>
        <Text
          style={{
            ...generalStyles.textRed,
            ...generalStyles.marginLeft5,
            ...generalStyles.textExSm,
          }}>
          {/* {company ? company.toUpperCase() : null} */}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: COLORS.lightGrey,
    backgroundColor: COLORS.darkGrey,
  },
});
