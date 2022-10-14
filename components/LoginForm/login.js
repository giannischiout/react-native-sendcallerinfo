import React, {useState, useEffect, Component} from 'react';
import {
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';

//Imports from different directories
import {ShowPass, style} from './showPassword';

//Import Styles.
import {LoginStyles} from './loginStyles';
import {generalStyles} from '../generalStyles';
import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {doUserLogIn} from './fetchUser';

//Import to store users credential
import * as Keychain from 'react-native-keychain';

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

  //Build the requestOptions for the login verification

  //fetch user and then navigate to the main page

  return (
    <View style={generalStyles.body}>
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.inputLabel}>Username:</Text>
        <View style={LoginStyles.inputWrapper}>
          <Icon name="account" style={LoginStyles.icon} />
          <TextInput
            placeholderTextColor="#ffffff"
            style={LoginStyles.input}
            value={username}
            placeholder={username}
            onChangeText={text => handleUser(text)}></TextInput>
        </View>
        <Text style={LoginStyles.inputLabel}>Password:</Text>
        <View style={LoginStyles.inputWrapper}>
          <Icon name="lock" style={LoginStyles.icon} />
          <TextInput
            placeholderTextColor="#ffffff"
            style={LoginStyles.input}
            value={password}
            placeholder={password}
            secureTextEntry={showPass}
            onChangeText={text => handlePass(text)}></TextInput>
          <ShowPass bool={showPass} action={handleShowText} />
        </View>
        <Text style={LoginStyles.clearLog} onPress={handleLogout}>
          Clear Login Data
        </Text>

        <TouchableOpacity style={LoginStyles.button} onPress={onPressActions}>
          <View>
            <Text style={LoginStyles.buttonText}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>

        {/* <Text style={LoginStyles.whiteText}>Persist Text: {username}</Text>
        <Text style={LoginStyles.whiteText}>Persist Password: {password}</Text> */}
      </View>
    </View>
  );
};
