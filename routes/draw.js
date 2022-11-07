import {createDrawerNavigator} from '@react-navigation/drawer';
import {Search} from '../components/Search';
import {CallDetection} from '../components/CallDetection/calldetection';
import {NavDrawer} from '../nav/Nav';
import {Image, StyleSheet} from 'react-native';
import IconFontAw from '../node_modules/react-native-vector-icons/FontAwesome/';
// import {ResultStack} from './homeStack';
import {SearchResult} from '../components/Search/SearchResult/SearchResult';
import {SearchForm} from '../components/Search/SearchForm/SearchForm';
import BackIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

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
        component={SearchForm}
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
  },
});

// <Drawer.Screen
// name="Search"
// initialRouteName="SeachForm"
// component={ResultStack}
// // options={{
// //   header: ({navigation}) => <NavDrawer navigation={navigation} />,
// //   drawerIcon: () => (
// //     <IconFontAw name="search" style={Styles.SideBarIcon} />
// //   ),
// // }}
// options={{headerShown: false}}
// />
