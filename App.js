/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Navigator from './routes/homeStack';
// const Stack = createNativeStackNavigator();

import {HomeStack} from './routes/homeStack';
import {MyDrawer} from './routes/draw';
// import {CallDetection} from './components/CallDetection/calldetection';
// import {UserLogin} from './components/LoginForm/login';
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Login"
//           component={UserLogin}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="CallDetect"
//           component={CallDetection}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//       <>
//         <Menu></Menu>
//       </>
//     </NavigationContainer>
//   );
// };

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <HomeStack navigation={navigation} />
    </NavigationContainer>
  );
};
module.exports = App;
