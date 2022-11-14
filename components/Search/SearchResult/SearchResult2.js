import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {COLORS} from '../../Colors';
import {FONTS} from '../../../shared/Fonts/Fonts';
import {generalStyles} from '../../generalStyles';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export const SearchResult2 = ({route}) => {
  // console.log(route.params);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterData, setMasterData] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [openSingle, setOpenSingle] = useState(false);

  const hadleData = () => {
    setFilteredDataSource(route.params);
    setFilteredDataSource(route.params);
  };
  useEffect(() => {
    hadleData();
  }, []);

  const ItemView = ({item, index}) => {
    console.log(item);

    return (
      // Flat List Item
      <>
        <View style={styles.header}>
          <Text style={styles.itemStyle}> {`${index + 1}: `}</Text>
          <Text style={styles.itemStyle}>{item.NAME}</Text>
        </View>
        <View>
          {Object.keys(item).map((key, index) => {
            return (
              isOpen && (
                <View key={index}>
                  {console.log('index: ' + index)}
                  {key === 'NAME' ? null : (
                    <View style={styles.row}>
                      <TouchableOpacity
                        onPress={closeTabs}
                        style={styles.closeTabs}>
                        <Text>{isOpen ? 'Close Tabs' : 'Open Tabs'}</Text>
                        <Icon name={isOpen ? 'up' : 'down'} />
                      </TouchableOpacity>
                      <Text
                        onPress={openSingleTab(index)}
                        style={styles.itemHeader}>{`${key}:`}</Text>
                      <Text style={styles.item}>{item[key]}</Text>
                    </View>
                  )}
                </View>
              )
            );
          })}
        </View>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const closeTabs = () => {
    setIsOpen(prev => !prev);
  };

  const openSingleTab = index => {
    console.log(index);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={closeTabs} style={styles.closeTabs}>
            <Text>{isOpen ? 'Close Tabs' : 'Open Tabs'}</Text>
            <Icon name={isOpen ? 'up' : 'down'} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
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
    borderColor: '#009688',
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
    padding: 15,
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
});
