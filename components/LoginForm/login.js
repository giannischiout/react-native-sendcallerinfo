import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
//Imports from different directories:
import {LoginInputUser, LoginInputPass} from './LoginInput';
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
  const [showPass, setShowPass] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleShowText = () => setShowPass(previousState => !previousState);
  const handlePass = text => setPassword(text);
  const handleUser = text => setUsername(text);

  //Login Button
  const onPressActions = () => {
    if (isChecked) {
      storeCred();
    }
    doUserLogIn(username, password, navigation);
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

  //Set PASS and Username with KeyChain
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
      handleCheck();
    }
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

  const getData = async () => {
    const val = await AsyncStorage.getItem('@checkBtn');
    const value = JSON.parse(val);
    console.log('valueGetData ' + value);
    //On first login there is no value stored, so we set it to false. after the login we have a new value saved and we later retreive it and store it in the variable 'value'
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
          <CheckBox
            isChecked={isChecked}
            handleCheck={handleCheck}
            setIsChecked={setIsChecked}
            // isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}></CheckBox>
          <LoginButton onPressActions={onPressActions}></LoginButton>
          <ClearButton handleLogout={handleLogout}></ClearButton>
        </View>
      </View>
      <Text>delete this</Text>
    </>
  );
};
