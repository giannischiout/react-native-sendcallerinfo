import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserLogin} from '../components/LoginForm/login';
import {NavStyle} from '../nav/Nav';
import {MyDrawer} from './draw';

import {SearchResult} from '../components/Search/SearchResult/SearchResult';
import {SearchResult2} from '../components/Search/SearchResult/SearchResult2';
export const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={UserLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchResult2"
        component={SearchResult2}
        options={{
          header: ({navigation}) => (
            <NavStyle navigation={navigation} showback={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
