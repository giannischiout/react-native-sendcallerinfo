import React, {useState} from 'react';
import {COLORS} from '../../Colors';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';

export const CustomSwitch = ({startListenerTapped, stopListenerTapped}) => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(previousState => !previousState);
    isOn ? stopListenerTapped() : startListenerTapped();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isOn ? styles.switchOn : styles.switchOff}
        activeOpacity={1}
        onPress={toggleSwitch}>
        <Text style={styles.textOn}>{isOn ? 'ON' : null}</Text>

        <View style={styles.inner}>
          <FontIcon
            style={isOn ? styles.iconON : styles.iconOFF}
            name={isOn ? 'check' : 'power-off'}></FontIcon>
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
    backgroundColor: COLORS.switchBack,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchOn: {
    width: 55,
    height: 30,
    backgroundColor: COLORS.almostWhite,
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
    elevation: 9,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 10,
    shadowRadius: 5,
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
    color: COLORS.redDark,
  },
  textOn: {
    fontSize: 12,
    color: COLORS.redDark,
  },
});
