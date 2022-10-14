import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {LoginStyles} from './loginStyles';
import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons';
import {ShowPass} from './showPassword';

export const LoginInputUser = ({username, handleUser}) => {
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <Icon name="account" style={LoginStyles.icon} />
        <TextInput
          placeholderTextColor="#ffffff"
          style={LoginStyles.input}
          value={username}
          placeholder={username}
          onChangeText={handleUser}></TextInput>
      </View>
    </>
  );
};

export const LoginInputPass = ({
  password,
  handlePass,
  handleShowText,
  showPass,
}) => {
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <Icon name="lock" style={LoginStyles.icon} />
        <TextInput
          placeholderTextColor="#ffffff"
          style={LoginStyles.input}
          value={password}
          placeholder={password}
          secureTextEntry={showPass}
          onChangeText={handlePass}></TextInput>
        <ShowPass bool={showPass} action={handleShowText} />
      </View>
    </>
  );
};
