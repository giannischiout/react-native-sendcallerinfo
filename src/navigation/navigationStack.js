import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserLogin } from '../../components/LoginForm/login';
import { SearchResult } from '../../components/Search/SearchResult/SearchResult';
import { DrawerNav } from './navigationDrawer';
import { NavStyle } from './navStyle';


export const Stack = createNativeStackNavigator();

export const HomeNav = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Login"
        component={UserLogin}
        options={{
          header: ({ navigation }) => (
            <NavStyle navigation={navigation} title={'Login'} showback={false} />
          ),
        }}
      />
      <Stack.Screen
        name="Main"
        component={DrawerNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          header: ({ navigation }) => (
            <NavStyle navigation={navigation} title={'Search Result'} showback={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};




