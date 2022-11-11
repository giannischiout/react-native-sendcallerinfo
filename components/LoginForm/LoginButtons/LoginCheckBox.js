import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

//Imports From other Files:
import {COLORS} from '../../Colors';
import {FONTS} from '../../../shared/Fonts/Fonts';
import FontAws from '../../../node_modules/react-native-vector-icons/FontAwesome5';
//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckBox = ({
  isChecked,
  setIsChecked,
  password,
  company,
  username,
}) => {
  const handleCheck = async () => {
    /* On clicking the button we will change the state. Before setting setIsChecked-> i change the value manually, and store it in a variable, then i alter the state*/
    try {
      let value = JSON.stringify(!isChecked);
      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }
    setIsChecked(true);
  };

  const getData = async () => {
    const val = await AsyncStorage.getItem('@checkBtn');
    const value = await JSON.parse(val);
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
    <>
      {username && password && company ? (
        <TouchableOpacity onPress={handleCheck} style={Styles.containerCheck}>
          <View style={Styles.checkBox}>
            <Text>
              <FontAws
                style={isChecked ? Styles.checkIcon : Styles.unCheckedIcon}
                name="check"
              />
            </Text>
          </View>
          <Text style={isChecked ? Styles.textSave : Styles.text}>
            {isChecked ? 'User data saved' : 'Store User Data'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const Styles = StyleSheet.create({
  containerCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    color: COLORS.white,
    marginBottom: 20,
  },
  checkBox: {
    borderColor: '#ececec',
    borderWidth: 1.5,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  checkIcon: {
    color: COLORS.redPrimary,
  },
  unCheckedIcon: {
    color: 'white',
  },
  text: {
    color: COLORS.lightGrey,
    marginLeft: 5,
    fontFamily: FONTS.NotoLight,
  },
  textSave: {
    marginLeft: 5,
    letterSpacing: 0.8,
    color: COLORS.lightGrey,
    fontFamily: FONTS.NotoLight,
  },
});
