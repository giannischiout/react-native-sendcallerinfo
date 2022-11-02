import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserLogin} from '../components/LoginForm/login';
import {CallDetection} from '../components/CallDetection/calldetection';
import {NavStyle} from '../nav/Nav';
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {height: 100},
      }}>
      <Stack.Screen
        name="Login"
        component={UserLogin}
        options={{title: 'My home', headerTitle: () => <NavStyle />}}
      />
      <Stack.Screen name="CallDetect" component={CallDetection} />
    </Stack.Navigator>
  );
};
