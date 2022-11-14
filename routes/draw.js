import {createDrawerNavigator} from '@react-navigation/drawer';
import {CallDetection} from '../components/CallDetection/calldetection';
import {NavDrawer} from '../nav/Nav';
import {StyleSheet} from 'react-native';
import IconFontAw from '../node_modules/react-native-vector-icons/FontAwesome/';
// import {ResultStack} from './homeStack';
import {SearchForm} from '../components/Search/SearchForm/SearchForm';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS} from '../components/Colors';
import {List} from '../components/ListView/List';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          // backgroundColor: 'grey',
          width: '80%',
        },
        drawerActiveTintColor: COLORS.redPrimary,
        drawerInactiveTintColor: COLORS.darkGrey,
      }}>
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
        component={SearchForm}
        options={{
          header: ({navigation}) => <NavDrawer navigation={navigation} />,
          drawerIcon: () => (
            <FeatherIcon name="search" style={Styles.SideBarIcon} />
          ),
        }}
      />
      <Drawer.Screen
        name="List"
        component={List}
        options={{
          header: ({navigation}) => <NavDrawer navigation={navigation} />,
          drawerIcon: () => (
            <FeatherIcon name="search" style={Styles.SideBarIcon} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Styles = StyleSheet.create({
  SideBarIcon: {
    fontSize: 20,
    color: COLORS.redPrimary,
  },
});
