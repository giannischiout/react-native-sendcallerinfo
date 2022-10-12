import React, {useState, useEffect, Component} from 'react';
import {
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';

import {LoginStyles} from './loginStyles';
import {generalStyles} from '../generalStyles';
import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import to store users credential
import * as Keychain from 'react-native-keychain';


export const UserLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isChecked, setIsChecked] = useState(false);

 

 
  const onPressActions = () => {
    doUserLogIn();
    storeCred();
  };

  

  //Store Credentials for future Login
  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log(
            `Credentials fully loaded for user ${credentials.username}`,
          );
          setUserDetails(credentials);
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
    await Keychain.setGenericPassword(username, password);
    setUserDetails(username, password);
  };
  //Handle Logout with KeyChain
  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setUserDetails({});
      
    }
  };

  //Build the requestOptions for the login verification
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };
  //fetch user and then navigate to the main page
  const doUserLogIn = async () => {
    try {
      await fetch(
        'https://dgsoft.oncloud.gr/s1services/JS/MobileTest/loginMobApp',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          console.log(data);
          if (
            data.result === 'OK' &&
            (data.error === 'No Errors') &
              (data.errorcode === 200) &
              (data.success === true)
          )
          
          {
            Alert.alert(
              'Success!',
              `User ${username} has successfully signed in!`,
            );
            navigation.navigate('CallDetect');
          }
          else if(data.error ===  "Wrong Username/Password")  {
            {
              Alert.alert('Failure Wrong Username/Password');
              
            }
            navigation.navigate('Login');
          } 
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={generalStyles.body}>
      <View style={LoginStyles.container} >
        <Text style={LoginStyles.inputLabel}>Username:</Text>
        <View style={LoginStyles.inputWrapper}>
          <Icon name='account' style={LoginStyles.icon} />
          <TextInput
              placeholderTextColor="#ffffff"
              style={LoginStyles.input}
              value={userDetails ? userDetails.username : username}
              placeholder={userDetails ? userDetails.username: ''}
              onChangeText={text => setUsername(text)}
              keyboardType={'email-address'}>
          </TextInput>
        </View>
        <Text style={LoginStyles.inputLabel}>Password:</Text>
        <View style={LoginStyles.inputWrapper}>
          <Icon name='lock' style={LoginStyles.icon}/>
          <TextInput
            placeholderTextColor="#ffffff"
            style={LoginStyles.input}
            value={password}
            placeholder={userDetails ? userDetails.password: ''}
            secureTextEntry
            onChangeText={text => setPassword(text)}>
          </TextInput>
        </View>
          <Text style={LoginStyles.clearLog} onPress={handleLogout}>Clear Login Data</Text>


        <TouchableOpacity style={LoginStyles.button} onPress={onPressActions}>
          <View>
            <Text style={LoginStyles.buttonText}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>




        <Text style={LoginStyles.whiteText}>
          Persist Text: {userDetails.username}
        </Text>
        <Text style={LoginStyles.whiteText}>
          Persist Password: {userDetails.password}
        </Text>
      </View>
    </View>
  );
};
