import { Children } from "react"
import { View, StyleSheet } from "react-native"

const ViewCol = (props) => {

  return (
    <View>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row'
  },
})

export default ViewCol;