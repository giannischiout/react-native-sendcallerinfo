import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../styles/colors";
export const NavStyle = ({ showback, navigation, title }) => {
  const goback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.leftView]}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.rightView}>
        {showback && (
          <BackIcon
            onPress={goback}
            name="arrowleft"
            style={styles.burgerIcon}
          />
        )}
      </View>
    </View>
  );
};





export const NavDrawerStyle = ({ navigation, title }) => {
  const toggleMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <View style={[styles.leftView]}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.rightView}>
        <Icon name="menu" style={styles.burgerIcon} onPress={toggleMenu} />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.redPrimary,
    flexDirection: 'row',
    paddingHorizontal: 30,

  },
  leftView: {
    width: '50%',
    justifyContent: 'center',
  },
  rightView: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  burgerIcon: {
    color: 'white',
    fontSize: 24,
  },
  text: {
    color: '#fff',
    fontFamily: 'Jura-Medium',
    fontSize: 18,
    letterSpacing: 0.7,
  },
  burgerIcon: {
    color: 'white',
    fontSize: 25
  }
})