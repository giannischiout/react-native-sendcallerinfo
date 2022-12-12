import React, { useState, useEffect } from 'react';
import { COLORS } from '../../styles/colors';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
//Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBooleanAsyncStorage from '../../utils/asyncStorageBool';
const saveToAsyncBool = async (itemName, value) => {
  try {
    let val = JSON.stringify(value);
    console.log(`value stored ${val}`);
    await AsyncStorage.setItem(itemName, val);
  } catch (e) {
    console.log('SaveToAsyncError ' + e);
  }
};

export const CustomSwitch = ({ startListenerTapped, stopListenerTapped }) => {
  // const [isOn, setIsOn] = useState(false);
  const [value, setBoolean] = useBooleanAsyncStorage('@toggleCallDetection');

  const toggleSwitch = () => {

    setBoolean(prev => !prev)
    startListener();
  };

  const startListener = () => {
    value ? stopListenerTapped() : startListenerTapped();
  };


  useEffect(() => {
    startListener();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={value ? styles.switchOn : styles.switchOff}
        activeOpacity={1}
        onPress={toggleSwitch}>
        <Text style={styles.textOn}>{value ? 'ON' : null}</Text>

        <View style={styles.inner}>
          <FontIcon
            style={value ? styles.iconON : styles.iconOFF}
            name={value ? 'check' : 'power-off'}></FontIcon>
        </View>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  switchOff: {
    width: 55,
    height: 30,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchOn: {
    width: 55,
    height: 30,
    backgroundColor: COLORS.redPrimary,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inner: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    marginHorizontal: 3,
    elevation: 10,
    shadowOffset: { width: -3, height: -3 },
    shadowRadius: 10,
    shadowColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOFF: {
    fontSize: 15,
    color: COLORS.lightGrey,
  },
  iconON: {
    fontSize: 15,
    color: COLORS.redPrimary,
  },
  textOn: {
    fontSize: 12,
    color: COLORS.white,
  },
});
