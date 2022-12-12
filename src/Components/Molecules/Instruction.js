import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TextBold from "../Atoms/Texts/TextBold";
import TextLight from "../Atoms/Texts/TextLight";
import Icon from 'react-native-vector-icons/Ionicons'
const Information = () => {
  return (
    <View style={styles.view}>
      <View style={styles.view2}>
        <Icon name="information-circle" ></Icon>
      </View>
      <View style={styles.view3}>
        <TextLight style={styles.text}>Turn the Swith on when you want to register your calls with CTI </TextLight>
        {/* <Text style={styles.text}>Turn the Swith on when you want to register your calls with CTI </Text> */}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 30,
    backgroundColor: '#e6e7e5',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 2,
    color: 'black',
    marginRight: 5,
  },
  view2: {
  },
  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
});
export default Information;