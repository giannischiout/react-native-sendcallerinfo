import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
//Imports from different directories:

import {LoginInputUser, LoginInputPass, LoginInputCompany} from './LoginInput';
import {LoginButton} from './LoginButtons/LoginButton';
import {ClearButton} from './LoginClearButton';
import {TopBar} from './topBar';
import {CheckBox} from './LoginButtons/LoginCheckBox';
//Import Styles:
import {LoginStyles} from './loginStyles';
import {generalStyles} from '../generalStyles';
//Import Fetch Request:

import {doUserLogIn} from './fetchUser';
//Import to store users credential:
import * as Keychain from 'react-native-keychain';

//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';

//Build final Login Component:
export const UserLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(null);
  const [showPass, setShowPass] = useState(true);
  //Store Password Checkbox -> File: LoginButtons/LoginCheckbox
  const [isChecked, setIsChecked] = useState(false);

  const handleShowText = () => setShowPass(previousState => !previousState);
  const handlePass = text => setPassword(text);
  const handleUser = text => setUsername(text);
  const handleCompany = text => setCompany(text);

  console.log(message);
  //Login, OnSubmit Button
  const onPressActions = () => {
    //If checkbox:on -> Store Credentials
    if (isChecked) {
      storeCred();
    }
    //Fetch Request
    doUserLogIn(username, password, company, navigation, setMessage);
  };

  // Store Credentials for future Login
  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log(
            `Credentials fully loaded for user ${credentials.username}`,
          );
          setPassword(credentials.password);
          setUsername(credentials.username);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);

  //Set PASS and Username with KeyChain or AsyncStorage
  const storeCred = async () => {
    if (password && username) {
      await Keychain.setGenericPassword(username, password);
    }
  };

  //Handle Logout with KeyChain
  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout && isChecked) {
      setUsername('');
      setPassword('');
      clearOtherFields();
      resaveCheckBox();
    }
  };
  //Clear Other fields : Company -> On logout

  const clearOtherFields = async () => {
    setCompany('');
  };

  const resaveCheckBox = async () => {
    try {
      let value = JSON.stringify(!isChecked);
      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }

    setIsChecked(previousValue => !previousValue);
  };

  const handleCheck = async () => {
    /* On clicking the button we will change the state. Before setting setIsChecked-> i change the value manually, and store it in a variable, then i alter the state*/
    try {
      let value = JSON.stringify(!isChecked);
      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }
    setIsChecked(previousState => !previousState);
  };

  return (
    <>
      <TopBar></TopBar>
      <View style={generalStyles.body}>
        <View style={LoginStyles.container}>
          <Text style={LoginStyles.inputLabel}>Username:</Text>
          <LoginInputUser
            username={username}
            handleUser={handleUser}></LoginInputUser>
          <Text style={LoginStyles.inputLabel}>Password:</Text>
          <LoginInputPass
            password={password}
            handlePass={handlePass}
            handleShowText={handleShowText}
            showPass={showPass}></LoginInputPass>
          <Text style={LoginStyles.inputLabel}>Company:</Text>
          <LoginInputCompany
            company={company}
            handleCompany={handleCompany}></LoginInputCompany>
          <CheckBox
            isChecked={isChecked}
            handleCheck={handleCheck}
            setIsChecked={setIsChecked}></CheckBox>
          <LoginButton onPressActions={onPressActions}></LoginButton>
          <ClearButton handleLogout={handleLogout}></ClearButton>
        </View>
      </View>
    </>
  );
};
