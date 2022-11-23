//React Native Imports:
import React, { useState, useEffect, useContext } from 'react';
//Import Permissions:
import { View, PermissionsAndroid } from 'react-native';
import {
  LoginInputUser,
  LoginInputPass,
  LoginInputCompany,
} from './LoginInput/LoginInput';
//Imports from different directories:
import { Logo } from './logo/Logo';
import { LoginButton } from './LoginButtons/LoginButton';
// import {ClearButton} from '../LoginClearButton';
import { ClearButton } from './LoginClearButton/LoginClearButton';
import { CheckBox } from './LoginButtons/LoginCheckBox';
import { pop_Alert } from '../Services/validateFIelds';
import { FadeInView } from '../../shared/AnimatedView/AnimatedView';
//Import CSS Styles:
import { LoginStyles } from './loginStyles';
import { generalStyles } from '../generalStyles';
//Import Fetch Request:
import { doUserLogIn } from './loginServices/fetchUser';
//Import to store users credential:
import * as Keychain from 'react-native-keychain';
//Import Async Storage:
import AsyncStorage from '@react-native-async-storage/async-storage';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Import useContext:
import { UserContext } from '../../useContext/context';
//Build final Login Component:
export const Login = ({ navigation }) => {

  const {
    username, setUsername,
    password, setPassword,
    company, setCompany } = useContext(UserContext);

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
    //post request
    const response = await doUserLogIn(username, password, company);
    actionsAfterLogin(response, navigation);
  };
  //
  const actionsAfterLogin = (res, navigation) => {
    setLoading(prev => !prev);
    if (
      res.result === 'OK' &&
      res.error === 'No Errors' &&
      res.errorcode === 200 &&
      res.success === true
    ) {
      storeCred();
      storeURL(res.soneURL);
      navigation.navigate('Main', {
        screen: 'Home',
        params: {
          username: username,
          userCTI: res.userName,
          passCTI: res.passWord
        }
      });
      setLoading(false);
    }
    if (res.dberror === 1 && res.errorcode === 220) {
      // console.log('Company Not found in database');
      setCompany('');
      pop_Alert(res.result);
      navigation.navigate('Login');
      setLoading(false);
    }

    if (res.errorcode == 250 && res.result == 'Wrong Username/Password') {
      // console.log('Wrong Username/Password');
      pop_Alert(res.result);
      navigation.navigate('Login');
      setLoading(false);
    }
    if (
      res.errorcode == 230 &&
      res.errorType == 'Login' &&
      res.success == false
    ) {
      // console.log('Please Fill Fields');
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
          // console.log(
          //   `Credentials fully loaded for user ${credentials.username}`,
          // );
          setPassword(credentials.password);
          setUsername(credentials.username);
          if (company) {
            setCompany(company);
          }
        } else {
          // console.log('No credentials stored');
        }

        // console.log(`AsyncCompany: ${company}`);
      } catch (error) {
        // console.log("Keychain couldn't be accessed!", error);
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
  const storeURL = async url => {
    await AsyncStorage.setItem('@URL', JSON.stringify(url));
  };
  //Handle Logout with KeyChain
  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    // console.log({logout});
    if (logout && isChecked) {
      clearAllFields();
      resaveCheckBox();
      setIsChecked(false);
      setLoading(prev => !prev);
    }
  };
  //Clear Other fields : Company -> On logout

  const clearAllFields = () => {
    setCompany('');
    setUsername('');
    setPassword('');
    setLoading(prev => !prev);
  };

  //Used after LOGIN OUT -> resets and resaves the original value of the checkbox
  const resaveCheckBox = async () => {
    try {
      let value = JSON.stringify(false);
      await AsyncStorage.setItem('@checkBtn', value);
    } catch (e) {
      console.log(e);
    }
    // setIsChecked(previousValue => !previousValue);
    setIsChecked(false);
  };

  return (
    <>
      <Logo />
      <LoginInputCompany
        handleCompany={handleCompany}></LoginInputCompany>
      <LoginInputUser
        handleUser={handleUser} />
      <LoginInputPass
        handlePass={handlePass}
        handleShowText={handleShowText}
        showPass={showPass}
      />
      <CheckBox
        isChecked={isChecked}
        setIsChecked={setIsChecked}></CheckBox>
      <LoginButton
        loading={loading}
        onPressActions={onPressActions}
        text={'Login'}
        message="message"></LoginButton>
      {/* <ClearButton handleLogout={handleLogout}></ClearButton> */}
      {isChecked ? (
        <ClearButton handleLogout={handleLogout}></ClearButton>
      ) : null}
    </>
  );
};

export const UserLogin = ({ navigation }) => {
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
      if (
        granted['android.permission.READ_CALL_LOG'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_PHONE_STATE'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('granted');
      } else {
        console.log('not granted');
        requestPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <View style={generalStyles.body}>
        <FadeInView
          style={LoginStyles.container}
          children={<Login navigation={navigation} />}></FadeInView>
      </View>
    </>
  );
};
