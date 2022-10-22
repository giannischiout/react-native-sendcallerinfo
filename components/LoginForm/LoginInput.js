import React from 'react';
import {TextInput, View, Text, Alert} from 'react-native';
import {LoginStyles} from './loginStyles';
import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcon from '../../node_modules/react-native-vector-icons/Foundation';
import {ShowPass} from './showPassword';

export const LoginInputUser = ({username, handleUser}) => {
  validate_fields = () => {
    if (username === '') {
      <Alert>"Alert Title", "My Alert Msg",</Alert>;
      return false;
    }
    return true;
  };

  making_call = () => {
    if (this.validate_fields) {
      <Alert>"Alert Title", "Succesfull login!!!",</Alert>;
    }
  };
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
export const LoginInputCompany = ({company, handleCompany}) => {
  console.log(`company inside Input: ${company}`);
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        {/* <FoundationIcon name="torso-business" style={LoginStyles.icon} /> */}
        <TextInput
          placeholderTextColor="#ffffff"
          style={LoginStyles.input}
          value={company}
          placeholder={company}
          onChangeText={handleCompany}></TextInput>
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
