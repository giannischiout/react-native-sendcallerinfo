import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {ListItem} from './ListItem';

import {COLORS} from '../../Colors';
import {FONTS} from '../../../shared/Fonts/Fonts';
import {generalStyles} from '../../generalStyles';

export const SearchResult = ({route}) => {
  // console.log(route.params);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterData, setMasterData] = useState();
  const [expand, setExpanded] = useState(false);

  const hadleData = () => {
    setFilteredDataSource(route.params);
    setMasterData(route.params);
  };
  useEffect(() => {
    hadleData();
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterData.filter(item => {
        const dataName = item.NAME ? item.NAME : '';
        const dataAddress = item.ADDRESS ? item.ADDRESS : '';
        const dataPhone01 = item.PHONE01 ? item.PHONE01 : '';
        const mobile = item.MOBILE ? item.MOBILE : '';
        const textData = text.toUpperCase().toString();
        return (
          dataName.indexOf(textData) > -1 ||
          dataAddress.indexOf(textData) > -1 ||
          dataPhone01.indexOf(textData) > -1 ||
          mobile.indexOf(textData) > -1
        );
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterData);
      setSearch('');
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search with a name"
          />
          {/* <TouchableOpacity onPress={closeTabs} style={styles.closeTabs}>
            <Text>{isOpen ? 'Close Tabs' : 'Open Tabs'}</Text>
            <Icon name={isOpen ? 'up' : 'down'} />
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item, index, separators}) => (
            <ListItem
              item={item}
              index={index}
              expand={expand}
              setExpand={setExpanded}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {},
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: COLORS.redPrimary,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.thinGrey,
    marginBottom: 2,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
  },
  closeTabs: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  itemHeader: {
    fontFamily: FONTS.NotoMedium,
    color: COLORS.black,
  },
  item: {
    fontFamily: FONTS.NotoReg,
    marginLeft: 5,
  },
  callDecoration: {
    textDecorationLine: 'underline',
  },
});
