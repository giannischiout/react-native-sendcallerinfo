import {createDrawerNavigator} from '@react-navigation/drawer';
import {Search} from '../components/Search';
import {CallDetection} from '../components/CallDetection/calldetection';
import {NavDrawer} from '../nav/Nav';
import {Image, StyleSheet} from 'react-native';
import IconFontAw from '../node_modules/react-native-vector-icons/FontAwesome/';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={CallDetection}
        options={{
          header: ({navigation}) => <NavDrawer navigation={navigation} />,
          drawerIcon: () => (
            <IconFontAw name="home" style={Styles.SideBarIcon} />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          header: ({navigation}) => <NavDrawer navigation={navigation} />,
          drawerIcon: () => (
            <IconFontAw name="search" style={Styles.SideBarIcon} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Styles = StyleSheet.create({
  SideBarIcon: {
    fontSize: 20,
  },
});
