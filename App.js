/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './components/Colors';
import { Layout } from './useContext/context';
import { HomeStack } from './routes/homeStack';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.redPrimary} />
      <Layout>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </Layout>

    </>
  );
};
module.exports = App;
