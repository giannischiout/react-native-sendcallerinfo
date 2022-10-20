import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

//Imports From other Files:
import {COLORS} from '../../Colors';
import FontAws from '../../../node_modules/react-native-vector-icons/FontAwesome5';
//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = async () => {
    try {
      let val = !isChecked;
      let value = JSON.stringify(val);
      console.log('val' + typeof val);
      console.log('value' + typeof value);

      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }
    setIsChecked(previousState => !previousState);
    console.log('on Press works fine');
  };
  const onBtnPress = () => {
    handleCheck();
  };

  const getData = async () => {
    const val = await AsyncStorage.getItem('@checkBtn');
    const value = JSON.parse(val);
    console.log('value ' + value);
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
    <View style={Styles.containerCheck}>
      <TouchableOpacity onPress={onBtnPress} style={Styles.checkBox}>
        <View style={Styles.checkBoxView}>
          <Text>
            {isChecked ? (
              <FontAws style={Styles.checkIcon} name="check" />
            ) : null}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={isChecked ? Styles.textSave : Styles.text}>
        {isChecked ? 'User data saved' : 'Store User Data'}
      </Text>
    </View>
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
  },
  checkBoxView: {
    flex: 1,
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
