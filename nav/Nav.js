import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLORS} from '../components/Colors';
import Icon from '../node_modules/react-native-vector-icons/Feather';
export const NavStyle = () => {
  return (
    <View style={Styles.header}>
      <View style={[Styles.containerStart]}>
        <Image
          style={[Styles.image, Styles.container]}
          source={require('../assets/imgs/ccm.png')}
        />
      </View>
      {/* <View style={Styles.containerEnd}>
        {!logScreen && <Icon name="menu" style={Styles.burgerIcon} />}
      </View> */}
    </View>
  );
};
export const NavDrawer = ({navigation}) => {
  const toggleMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={Styles.header}>
      <View style={[Styles.containerStart]}>
        <Image
          style={[Styles.image, Styles.container]}
          source={require('../assets/imgs/ccm.png')}
        />
      </View>
      <View style={Styles.containerEnd}>
        <Icon name="menu" style={Styles.burgerIcon} onPress={toggleMenu} />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGrey,
    height: 60,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 85,
    height: 30,
  },
  containerStart: {
    width: '50%',
  },
  containerEnd: {
    alignItems: 'flex-end',
    width: '50%',
  },
  burgerIcon: {
    color: COLORS.white,
    fontSize: 25,
  },
});
