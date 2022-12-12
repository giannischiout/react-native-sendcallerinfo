import React, { useContext } from 'react';
import { Text, View, StyleSheet, Linking, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { generalStyles } from '../../generalStyles';
import { settingsBarNoFlex } from '../SettingsBar/SettingsBar';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { UserContext } from '../../../useContext/context';
import { useFetch } from '../../Services/useFetch';
import { ListItem } from '../../../src/Components/Molecules/FlatlistItem/FlatItem';

export const LastCaller = () => {
  const { soneURL, number } = useContext(UserContext);
  const { data, loading } = useFetch('https://ccmde1.cloudon.gr/softone/soneCustomer.php', {
    callingParty: number,
    url: soneURL,
  }, number);


  const callNum = () => { Linking.openURL(`tel:${number}`) };
  return (
    <>
      <View style={settingsBarNoFlex.container}>
        <View style={Styles.rowFlex}>
          <Text style={generalStyles.textMediumGrey}>Last Caller:</Text>
          <Text
            onPress={() => callNum()}
            style={[
              generalStyles.textBoldGrey,
              generalStyles.marginLeft5,
              Styles.phone,
            ]}>
            {number}
          </Text>
        </View>
      </View>
      <View>
        {data?.result ? <CallerInfo data={data} /> : <Text>User Not Found</Text>}
      </View>

    </>
  );
};

const CallerInfo = ({ data }) => {
  return (
    <View >
      <FlatList
        data={data.result}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={RenderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={9}
      />
    </View >

  );
};

const ItemSeparatorView = () => {
  return (
    <View style={{ width: '100%', margin: 3 }} />
  );
};
//Flatlist Item to be rendered:
const RenderItem = ({ item, index }) => {
  return (
    <ListItem item={item} index={index} />)
};

const keyExtractor = (item, index) => {
  { return index.toString() }
};



const Styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callerInfo: {
    color: COLORS.darkGrey,
  },
  textHeader: {
    fontSize: 15,
    fontFamily: FONTS.NotoLight,
  },
  text: {
    fontSize: 13,
    fontFamily: FONTS.NotoReg,
    color: '#000',
  },
  phone: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.NotoBold,
  },
});
