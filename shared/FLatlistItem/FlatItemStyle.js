import { StyleSheet } from "react-native";
import { COLORS } from "../../components/Colors";
import { FONTS } from "../Fonts/Fonts";

export const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 5,
    elevation: 1,
    borderWidth: 2,
    borderColor: '#f2f1f1',
    backgroundColor: '#f2f1f1',
  },


  //Number and Name of customer:
  header: {
    flexDirection: 'row',
    padding: 2,
    height: 70,
    alignItems: 'center',
    backgroundColor: '#f2f1f1',
    borderRadius: 5

  },
  headerOpen: {
    flexDirection: 'row',
    padding: 2,
    height: 70,
    alignItems: 'center',
    backgroundColor: COLORS.redPrimary,
    borderRadius: 5
  },

  headerNumber: {
    color: 'black',

  },
  headerNumberOpen: {
    color: 'white'
  },
  headerName: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLORS.mediumGrey,
    marginLeft: 5
  },
  headerNameOpen: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
  },

  //
  expandables: {
    height: 200,
    backgroundColor: 'red'
  },

  itemHeader: {
    fontFamily: FONTS.NotoMedium,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
    borderBottomWidth: 2,
    borderBottomColor: '#f2f1f1',
  },
  rowLast: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
  },
  item: {
    fontFamily: FONTS.NotoReg,
    marginLeft: 5,
  },
  callDecoration: {
    textDecorationLine: 'underline',
  },


});