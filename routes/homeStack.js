import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserLogin} from '../components/LoginForm/login';
import {NavStyle, NavDrawer} from '../nav/Nav';
import {MyDrawer} from './draw';

import {SearchResult} from '../components/Search/SearchResult/SearchResult';
import {SearchForm} from '../components/Search/SearchForm/SearchForm';
import BackIcon from 'react-native-vector-icons/AntDesign';

export const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={UserLogin}
        options={{header: () => <NavStyle />}}
      />
      <Stack.Screen
        name="Main"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          header: ({navigation}) => (
            <NavStyle navigation={navigation} showback={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// export const ResultStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="SearchForm"
//         component={SearchForm}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="SearchResult"
//         component={SearchResult}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };
