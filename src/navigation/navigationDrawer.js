import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { CallDetection } from '../../components/CallDetection/calldetection';
// import {NavDrawer} from '../nav/Nav';

import IconFontAw from 'react-native-vector-icons/FontAwesome/';
// import {ResultStack} from './homeStack';
import { SearchForm } from '../../components/Search/SearchForm/SearchForm';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../styles/colors';
import { NavDrawerStyle } from './navStyle';
import CallDetect from '../pages/CallDetection';


const Drawer = createDrawerNavigator();

export const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: '100%',
        },
        drawerActiveTintColor: COLORS.redPrimary,
        drawerInactiveTintColor: COLORS.darkGrey,

      }}>
      <Drawer.Screen
        name="Home"
        component={CallDetect}
        options={{
          header: ({ navigation }) => <NavDrawerStyle title={'Call Detect'} navigation={navigation} />,
          drawerIcon: () => (
            <IconFontAw name="home" style={styles.SideBarIcon} />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchForm}
        options={{
          header: ({ navigation }) => <NavDrawerStyle title={'Call Detect'} navigation={navigation} />,
          drawerIcon: () => (
            <FeatherIcon name="search" style={styles.SideBarIcon} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  SideBarIcon: {
    fontSize: 20,
    color: COLORS.redPrimary,
  },
});
