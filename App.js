/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './components/Colors';

import {HomeStack} from './routes/homeStack';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.redPrimary} />
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </>
  );
};
module.exports = App;
