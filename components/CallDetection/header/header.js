import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons/';
import AntIcon from '../../../node_modules/react-native-vector-icons/AntDesign';
import {generalStyles} from '../../generalStyles';
import {COLORS} from '../../Colors';

export const HeaderComp = () => {
  return (
    <>
      <View
        style={{
          ...generalStyles.containerRow,
          ...generalStyles.marginVerticalMed,
        }}>
        <Icon style={styles.settingsIcon} name="settings"></Icon>
        <Text style={styles.text}>Settings</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontSize: 25,
    letterSpacing: 1,
  },
  settingsIcon: {
    marginRight: 5,
    color: COLORS.lightGrey,
    fontSize: 25,
  },
  settingsView: {
    marginHorizontal: 10,
  },
});
