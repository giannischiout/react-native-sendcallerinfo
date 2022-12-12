import React from "react"
import { View, StyleSheet } from "react-native"

const ViewRow = (props) => {
  return (
    <View style={[
      styles.view,
      props.style,
      props.spaceBetween && styles.spaceBetween,
      props.spaceEvenly && styles.spaceEvenly,
      props.spaceAround && styles.spaceAround,
    ]}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,

  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  spaceAround: {
    justifyContent: 'space-around',
  }
})

export default ViewRow;