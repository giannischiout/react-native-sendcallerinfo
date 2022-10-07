/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {UserLogin} from './LoginForm/login';
import {CallDetection} from './CallDetection/calldetection';
import {UserLoginTest} from './LoginForm/loginTest';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={UserLoginTest} />
        <Stack.Screen name="CallDetect" component={CallDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
module.exports = App;
