import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
//Imports from different directories:
import {LoginInputUser, LoginInputPass} from './LoginInput';
import {LoginButton} from './LoginButton';
import {ClearButton} from './LoginClearButton';
//Import Styles:
import {LoginStyles} from './loginStyles';
import {generalStyles} from '../generalStyles';
//Import Fetch Request:
import {doUserLogIn} from './fetchUser';
//Import to store users credential:
import * as Keychain from 'react-native-keychain';

//Build final Login Component:
export const UserLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const handleShowText = () => setShowPass(previousState => !previousState);
  const handlePass = text => setPassword(text);
  const handleUser = text => setUsername(text);

  const onPressActions = () => {
    storeCred();
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
    if (logout) {
      setUsername('');
      setPassword('');
    }
  };

  return (
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
        <ClearButton handleLogout={handleLogout}></ClearButton>
        <LoginButton onPressActions={onPressActions}></LoginButton>
      </View>
    </View>
  );
};
