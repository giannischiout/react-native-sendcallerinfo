import React from "react";
import { Text, StyleSheet } from "react-native";

const TextReg = (props) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans-Regular'
  }
});


export default TextReg;