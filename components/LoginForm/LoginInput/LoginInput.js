import React, { useContext } from 'react';
import { TextInput, View } from 'react-native';
import { LoginStyles } from '../loginStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ShowPass } from './ShowPassword/showPassword';
import { UserContext } from '../../../useContext/context';


export const LoginInputUser = ({ handleUser }) => {
  const { username } = useContext(UserContext);

  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <Icon name="account" style={LoginStyles.icon} />
        <TextInput
          style={LoginStyles.input}
          value={username}
          placeholder={'USERNAME'}
          placeholderTextColor={'#969696'}
          onChangeText={handleUser}></TextInput>
      </View>
    </>
  );
};
export const LoginInputCompany = ({ handleCompany }) => {
  const { company } = useContext(UserContext);

  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <MaterialIcon name="business" style={LoginStyles.icon} />
        <TextInput
          style={LoginStyles.input}
          value={company}
          placeholder={'COMPANY'}
          onChangeText={handleCompany}
          placeholderTextColor={'#969696'}></TextInput>
      </View>
    </>
  );
};

export const LoginInputPass = ({
  handlePass,
  handleShowText,
  showPass
}) => {
  const { password } = useContext(UserContext);
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <Icon name="lock" style={LoginStyles.icon} />
        <TextInput
          style={LoginStyles.input}
          value={password}
          placeholder={'PASSWORD'}
          placeholderTextColor={'#969696'}
          secureTextEntry={showPass}
          onChangeText={handlePass}></TextInput>
        <ShowPass bool={showPass} action={handleShowText} />
      </View>
    </>
  );
};

//Generic Input
export const Input = ({ placeholder, text, handleType }) => {
  return (
    <>
      <View style={LoginStyles.inputWrapper}>
        <TextInput
          placeholderTextColor="#969696"
          style={LoginStyles.input}
          defaultValue={text}
          placeholder={placeholder}
          onChangeText={handleType}></TextInput>
      </View>
    </>
  );
};