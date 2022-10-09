import React, {useState, useEffect, Component} from 'react';
import {TextInput, View, TouchableOpacity, Text} from 'react-native';
import {styles} from './loginStyles';

export const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doUserLogIn = () => {
    fetch('https://dgsoft.oncloud.gr/s1services/JS/MobileTest/loginMobApp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(res => {
      console.log(res);
      console.log(username);
      console.log(password);
    });
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
      </View>
    </View>
  );
};
