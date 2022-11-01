//React Native Imports:
import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {LoginInputUser, LoginInputPass, LoginInputCompany} from './LoginInput';
//Imports from different directories:
import {LoginButton} from './LoginButtons/LoginButton';
import {ClearButton} from './LoginClearButton';
import {TopBar} from './topBar';
import {CheckBox} from './LoginButtons/LoginCheckBox';
import {pop_Alert} from '../Services/validateFIelds';
//Import CSS Styles:
import {LoginStyles} from './loginStyles';
import {generalStyles} from '../generalStyles';
//Import Fetch Request:
import {doUserLogIn} from './loginServices/fetchUser';
//Import to store users credential:
import * as Keychain from 'react-native-keychain';
//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const storeURL = async url => {
  console.log('save async url:' + url);
  await AsyncStorage.setItem('@URL', JSON.stringify(url));
};

//Build final Login Component:
export const UserLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [showPass, setShowPass] = useState(true);
  //Store Password Checkbox -> File: LoginButtons/LoginCheckbox
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowText = () => setShowPass(previousState => !previousState);
  const handlePass = text => setPassword(text);
  const handleUser = text => setUsername(text);
  const handleCompany = text => setCompany(text);

  //Log message Receive from fetch response
  console.log(`company inside LOGIN Actions: ${company}`);
  //Login, OnSubmit Button

  const onPressActions = async () => {
    setLoading(true);
    const response = await doUserLogIn(username, password, company);
    storeURL(response.soneURL);
    actionsAfterLogin(response, navigation);
  };
  //
  const actionsAfterLogin = (res, navigation) => {
    if (
      res.result === 'OK' &&
      res.error === 'No Errors' &&
      res.errorcode === 200 &&
      res.success === true
    ) {
      console.log('Succesfull Login');
      storeCred();

      navigation.navigate('CallDetect', {company: company});
    }
    if (res.dberror === 1 && res.errorcode === 220) {
      console.log('Company Not found in database');
      setCompany('');
      pop_Alert(res.result);
      navigation.navigate('Login');
    }

    if (res.errorcode == 250 && res.result == 'Wrong Username/Password') {
      console.log('Wrong Username/Password');
      pop_Alert(res.result);
      navigation.navigate('Login');
    }
    if (
      res.errorcode == 230 &&
      res.errorType == 'Login' &&
      res.success == false
    ) {
      console.log('Please Fill Fields');
      pop_Alert(res.result);
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
          <View>
            {loading && <ActivityIndicator size="large" color="#fff" />}
          </View>
        </View>
      </View>
    </>
  );
};
