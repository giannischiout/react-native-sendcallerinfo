import React from "react"
import { View, StyleSheet } from "react-native"

const ViewBody = (props) => {
  return (
    <View style={[styles.view, props.style]}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
  },
})

export default ViewBody;