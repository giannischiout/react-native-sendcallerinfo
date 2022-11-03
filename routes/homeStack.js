import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserLogin} from '../components/LoginForm/login';
import {NavStyle, NavDrawer} from '../nav/Nav';
import {MyDrawer} from './draw';
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={UserLogin}
        options={{header: () => <NavStyle />}}
      />
      {/* <Stack.Screen
        name="CallDetect"
        component={CallDetection}
        options={{header: () => <NavDrawer />}}
      /> */}
      <Stack.Screen
        name="Main"
        component={MyDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
