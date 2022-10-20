import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

//Imports From other Files:
import {COLORS} from '../../Colors';
import FontAws from '../../../node_modules/react-native-vector-icons/FontAwesome5';
//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckBox = ({
  isChecked,
  setIsChecked,
  isDisabled,
  setIsDisabled,
}) => {
  const handleCheck = async () => {
    /* On clicking the button we will change the state. Before setting setIsChecked-> i change the value manually, and store it in a variable, then i alter the state*/
    try {
      let value = JSON.stringify(!isChecked);
      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }
    setIsChecked(previousState => !previousState);
    setIsDisabled(previousState => !previousState);
  };

  const getData = async () => {
    const val = await AsyncStorage.getItem('@checkBtn');
    const value = JSON.parse(val);
    console.log('valueGetData ' + value);
    //On first login there is no value stored, so we set it to false. after the login we have a new value saved and we later retreive it and store it in the variable 'value'
    if (value !== null) {
      setIsChecked(value);
    } else {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TouchableOpacity
      onPress={handleCheck}
      style={Styles.containerCheck}
      disabled={isDisabled}>
      <View style={Styles.checkBox}>
        <Text>
          {isChecked ? <FontAws style={Styles.checkIcon} name="check" /> : null}
        </Text>
      </View>
      <Text style={isChecked ? Styles.textSave : Styles.text}>
        {isChecked ? 'User data saved' : 'Store User Data'}
      </Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  containerCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    color: COLORS.white,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkIcon: {
    color: COLORS.white,
  },
  text: {
    color: COLORS.white,
    marginLeft: 5,
    letterSpacing: 1,
  },
  textSave: {
    marginLeft: 5,
    letterSpacing: 1,
    color: COLORS.lightGrey,
  },
});
