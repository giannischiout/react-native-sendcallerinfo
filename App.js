/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {CallDetection} from './components/CallDetection/calldetection';
import {UserLogin} from './components/LoginForm/login';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={UserLogin}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen name="CallDetect" component={CallDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
module.exports = App;
