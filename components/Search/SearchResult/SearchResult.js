import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { sortArray } from '../../Services/largestTRDT';
import Icon from 'react-native-vector-icons/AntDesign';
import { ListItem } from './ListItem';
import { fetchData } from '../../Services/fetch';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { generalStyles } from '../../generalStyles';
import { set } from 'react-native-reanimated';

export const SearchResult = ({ route }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  const [newData, setNewData] = useState(null)

  //For the button to expand/close all items
  const [expandAll, setExpandedAll] = useState(false);
  const [sqlOffset, setSQLOffset] = useState(null);
  const [page, setPage] = useState(1)
  const { payload, postData } = route.params;
  console.log('new Data')
  console.log(newData)


  const hadleShownData = () => {
    console.log('1')
    let sorted = sortArray(payload)
    setSQLOffset(sorted[0].TRDR)
    setData(sorted);
    console.log('------------------------03 FILTER DATA: ------------------------------------');
    console.log(data)
  }


  useEffect(() => {
    alert('useEffect')
    hadleShownData();
  }, []);



  const fetchOffset = async () => {

    console.log('001')
    console.log(sqlOffset)

    if (sqlOffset !== null) {
      postData.OFFSET = sqlOffset.toString();
      console.log(postData)
      const res = await fetchData(
        'https://ccmde1.cloudon.gr/softone/searchCustomer.php',
        postData,
      );
      console.log('06')
      console.log(res)

      if (res) {
        console.log('07')
        setNewData(res);
        console.log('----------New data')
        console.log(res)

        // let sort = sortArray(res);
        // setSQLOffset(sort[0].TRDR)
        // console.log('08')
        // console.log(sort[0].TRDR)


      }

    }




  };


  // useEffect(() => {
  //   fetchOffset();
  // }, [page])

  const expandAllItems = () => {
    setExpandedAll(prev => !prev);
  };

  //Flatlist Items:
  //Create the seperator:
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 1, width: '100%', backgroundColor: '#C8C8C8', }} />
    );
  };
  //Flatlist Item to be rendered:
  const renderItem = ({ item, index }) => {
    return <ListItem item={item} index={index} expandAll={expandAll} />;
  };

  const keyExtractor = (item, index) => {
    { return index.toString() }
  };

  const handleLoadMore = async () => {
    alert('onEndReach')

    fetchOffset()
    // setData([...data, ...newData])


  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search with a name"
          />
          <TouchableOpacity onPress={expandAllItems} style={styles.closeTabs}>
            <Text>{expandAll ? 'Close All' : 'Open All'}</Text>
            <Icon name={expandAll ? 'up' : 'down'} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
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
