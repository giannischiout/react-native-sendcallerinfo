import React, {useState, useEffect, Component} from 'react';
import {Alert, TextInput, View, TouchableOpacity, Text} from 'react-native';
import {styles} from './loginStyles';

import {CallDetection} from '../CallDetection/calldetection';

export const UserLoginTest = navigation => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  const doUserLogIn = async () => {
    try {
      await fetch(
        'https://dgsoft.oncloud.gr/s1services/JS/MobileTest/loginMobApp',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          console.log(data.result);
          if (data.result === 'OK') {
            Alert.alert(
              'Success!',
              `User ${username} has successfully signed in!`,
            );
          } else {
            Alert.alert('Failure try again!');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={'Username'}
          onChangeText={text => setUsername(text)}
          keyboardType={'email-address'}></TextInput>
        <TextInput
          style={styles.input}
          value={password}
          placeholder={'Password'}
          onChangeText={text => setPassword(text)}></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => doUserLogIn()}>
          <View>
            <Text style={styles.buttonText}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Details')}>
          <View>
            <Text style={styles.buttonText}>{'Sign in'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
