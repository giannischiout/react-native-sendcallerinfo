import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../components/Colors';
import Icon from '../node_modules/react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';

const LogoImage = ({navigation}) => {
  const route = useRoute();
  const iconPress = () => {
    if (route.name !== 'Home') {
      navigation.push('Main');
    }
  };

  return (
    <TouchableOpacity onPress={iconPress}>
      <Image
        style={[Styles.image]}
        source={require('../assets/imgs/ccm2.png')}
      />
    </TouchableOpacity>
  );
};

export const NavStyle = ({showback, navigation}) => {
  const goback = () => {
    navigation.goBack();
  };

  return (
    <View style={Styles.header}>
      <View style={[Styles.containerStart]}>
        <LogoImage navigation={navigation} />
      </View>
      <View style={Styles.containerEnd}>
        {showback && (
          <BackIcon
            onPress={goback}
            name="arrowleft"
            style={Styles.burgerIcon}
          />
        )}
      </View>
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
        <LogoImage navigation={navigation} />
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
    backgroundColor: COLORS.thinGrey,
    height: 60,
    alignItems: 'center',
    padding: 15,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 25,
  },
  containerStart: {
    width: '50%',
  },
  containerEnd: {
    alignItems: 'flex-end',
    width: '50%',
  },
  burgerIcon: {
    color: COLORS.redPrimary,
    fontSize: 30,
  },
});
