import {createDrawerNavigator} from '@react-navigation/drawer';
import {Search} from '../components/Search';
import {CallDetection} from '../components/CallDetection/calldetection';
import {NavDrawer} from '../nav/Nav';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="CallDetect"
        component={CallDetection}
        options={{
          header: ({navigation}) => <NavDrawer navigation={navigation} />,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          header: ({navigation}) => <NavDrawer navigation={navigation} />,
        }}
      />
    </Drawer.Navigator>
  );
};
