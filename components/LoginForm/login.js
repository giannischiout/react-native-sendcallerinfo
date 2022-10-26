//React Native Imports:
import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {LoginInputUser, LoginInputPass, LoginInputCompany} from './LoginInput';
//Imports from different directories:
import {LoginButton} from './LoginButtons/LoginButton';
import {ClearButton} from './LoginClearButton';
import {TopBar} from './topBar';
import {CheckBox} from './LoginButtons/LoginCheckBox';
import {Validate_fields} from '../Services/validateFIelds';
//Import CSS Styles:
import {LoginStyles} from './loginStyles';
import {generalStyles} from '../generalStyles';
//Import Fetch Request:
import {doUserLogIn} from './fetchUser';
//Import to store users credential:
import * as Keychain from 'react-native-keychain';
//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Build final Login Component:
export const UserLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [showPass, setShowPass] = useState(true);
  //Store Password Checkbox -> File: LoginButtons/LoginCheckbox
  const [isChecked, setIsChecked] = useState(false);

  const handleShowText = () => setShowPass(previousState => !previousState);
  const handlePass = text => setPassword(text);
  const handleUser = text => setUsername(text);
  const handleCompany = text => setCompany(text);

  //Log message Receive from fetch response
  console.log(`company inside LOGIN Actions: ${company}`);
  //Login, OnSubmit Button

  const onPressActions = async () => {
    const response = await doUserLogIn(username, password, company);
    console.log('response: ' + response);
    storeCred();
    actionsAfterLogin(response);
    Validate_fields(username, password, company);
  };

  const actionsAfterLogin = message => {
    if (message === 'ok') {
      storeCred();
      navigation.navigate('CallDetect', {company: company});
    }
    if (message === 'error') {
      console.log('Message was error');
      clearAllFields();
      navigation.navigate('Login');
    }
  };
  // Store Credentials for future Login
  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        const company = await AsyncStorage.getItem('@company');
        if (credentials) {
          console.log(
            `Credentials fully loaded for user ${credentials.username}`,
          );
          setPassword(credentials.password);
          setUsername(credentials.username);
          if (company) {
            setCompany(company);
          }
          // setCompany(company);
        } else {
          console.log('No credentials stored');
        }

        console.log(`AsyncCompany: ${company}`);
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);

  //Set PASS and Username with KeyChain or AsyncStorage
  //Store it only if the checkbox: checked
  const storeCred = async () => {
    console.log('company  inside store cred: ' + company);
    if (password && username && company && isChecked) {
      await Keychain.setGenericPassword(username, password);
      await AsyncStorage.setItem('@company', company);
    }
  };

  //Handle Logout with KeyChain
  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout && isChecked) {
      clearAllFields();
      resaveCheckBox();
      setIsChecked(false);
    }
  };
  //Clear Other fields : Company -> On logout

  const clearAllFields = () => {
    setCompany('');
    setUsername('');
    setPassword('');
  };

  //Used after LOGIN OUT -> resets and resaves the original value of the checkbox
  const resaveCheckBox = async () => {
    try {
      let value = JSON.stringify(!isChecked);
      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }
    // setIsChecked(previousValue => !previousValue);
    setIsChecked(false);
  };

  // const handleCheck = async () => {
  //   /* On clicking the button we will change the state. Before setting setIsChecked-> i change the value manually, and store it in a variable, then i alter the state*/
  //   try {
  //     let value = JSON.stringify(!isChecked);
  //     await AsyncStorage.setItem('@checkBtn', value);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setIsChecked(previousState => !previousState);
  // };

  return (
    <>
      <TopBar></TopBar>
      <View style={generalStyles.body}>
        <View style={LoginStyles.container}>
          <Text style={LoginStyles.inputLabel}>Company:</Text>
          <LoginInputCompany
            company={company}
            handleCompany={handleCompany}></LoginInputCompany>
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

          <CheckBox
            isChecked={isChecked}
            setIsChecked={setIsChecked}></CheckBox>
          <LoginButton
            onPressActions={onPressActions}
            message="message"></LoginButton>
          {/* <ClearButton handleLogout={handleLogout}></ClearButton> */}
          {isChecked ? (
            <ClearButton handleLogout={handleLogout}></ClearButton>
          ) : null}
        </View>
        <View></View>
      </View>
    </>
  );
};
