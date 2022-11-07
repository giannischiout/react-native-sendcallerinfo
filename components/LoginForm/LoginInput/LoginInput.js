import React, {useState} from 'react';
import {TextInput, View, Text, Alert} from 'react-native';
import {LoginStyles} from '../loginStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShowPass} from './ShowPassword/showPassword';
import {COLORS} from '../../Colors';

export const LoginInputUser = ({username, handleUser}) => {
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        {/* <Icon name="account" style={LoginStyles.icon} /> */}
        <TextInput
          style={LoginStyles.input}
          value={username}
          placeholder={'Username'}
          placeholderTextColor="#c2c2c2"
          onChangeText={handleUser}></TextInput>
      </View>
    </>
  );
};
export const LoginInputCompany = ({company, handleCompany}) => {
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <TextInput
          style={LoginStyles.input}
          value={company}
          placeholder={'Company'}
          onChangeText={handleCompany}
          placeholderTextColor="#c2c2c2"></TextInput>
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
        <TextInput
          style={LoginStyles.input}
          value={password}
          placeholder={'Password'}
          placeholderTextColor="#c2c2c2"
          secureTextEntry={showPass}
          onChangeText={handlePass}></TextInput>
        <ShowPass bool={showPass} action={handleShowText} />
      </View>
    </>
  );
};

//Generic Input
export const Input = ({placeholder, text, handleType}) => {
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <TextInput
          placeholderTextColor="#ffffff"
          style={LoginStyles.input}
          defaultValue={text}
          placeholder={placeholder}
          onChangeText={handleType}></TextInput>
      </View>
    </>
  );
};
