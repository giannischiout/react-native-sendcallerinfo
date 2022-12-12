import React from "react";
import { StyleSheet } from "react-native"
import ViewRow from "./Views/ViewRow"
import TextReg from "./Texts/TextReg";
import TextBold from "./Texts/TextBold";


const ExandableListItem = (props) => {
  const callNum = () => {
    Linking.openURL(`tel:${props.num}`);
  };

  return (
    <ViewRow style={styles.row}>
      <TextBold style={styles.itemHeader}>{props.title}</TextBold>
      <TextReg onPress={props.onPress && callNum} style={[styles.item, props.onPress && itemUnderline]}>{props.item}</TextReg>
    </ViewRow>
  )
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 2,
    borderBottomColor: '#f2f1f1',
    paddingVertical: 10,
    paddingLeft: 8,
  },
  itemHeader: {
    color: 'black',
  },
  item: {
    marginLeft: 5,
  },
  itemUnderline: {
    textDecorationLine: 'underline',
  }
});

export default ExandableListItem;