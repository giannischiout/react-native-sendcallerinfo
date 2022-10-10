import React, {useState, useEffect, Component} from 'react';
import {
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Switch,
  Button,
} from 'react-native';

import {styles} from './loginStyles';
import {generalStyles} from '../generalStyles';

//Import to store users credential
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserLoginTest = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('jsonValue' + ' ' + jsonValue);
      await AsyncStorage.setItem('@switch_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@switch_Key');
      let value = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(value);
      setIsEnabled(value);
    } catch (e) {
      // error reading value
    }
  };
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log(
            `Credentials fully loade for user ${credentials.username}`,
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

  const storeCred = async () => {
    await Keychain.setGenericPassword(username, password);
    setUserDetails(username, password);
  };

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setIsEnabled(false);
      setUserDetails({});
    }
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
          ) {
            Alert.alert(
              'Success!',
              `User ${username} has successfully signed in!`,
            );
            navigation.navigate('CallDetect');
          } else {
            Alert.alert('Failure try again!');
            navigation.navigate('Login');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressActions = () => {
    doUserLogIn();
    storeCred();
  };
  return (
    <View style={generalStyles.body}>
      <View>
        <View>
          <TextInput
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={username}
            placeholder={'Username'}
            onChangeText={text => setUsername(text)}
            keyboardType={'email-address'}></TextInput>
        </View>
        <TextInput
          placeholderTextColor="#ffffff"
          style={styles.input}
          value={password}
          placeholder={'Password'}
          secureTextEntry
          onChangeText={text => setPassword(text)}></TextInput>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={getData}
        />
        <TouchableOpacity style={styles.button} onPress={onPressActions}>
          <View>
            <Text style={styles.buttonText}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <View>
            <Text style={styles.buttonText}>{'Logout'}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.whiteText}>
          Persist Text: {userDetails.username}
        </Text>
        <Text style={styles.whiteText}>
          Persist Password: {userDetails.password}
        </Text>
      </View>
    </View>
  );
};
