/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './components/Colors';
import { Layout } from './useContext/context';
import { HomeStack } from './routes/homeStack';
import { HomeNav } from './src/navigation/navigationStack';

const App = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <StatusBar backgroundColor={COLORS.redPrimary} />
      <Layout>
        <NavigationContainer>
          <HomeNav />
        </NavigationContainer>
      </Layout>

    </SafeAreaView>
  );
};
module.exports = App;
