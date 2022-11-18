import React, { useEffect, useState, memo } from 'react';
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
import { MemoizedItem } from './ListItem';
import { fetchData } from '../../Services/fetch';
import { COLORS } from '../../Colors';
import { FONTS } from '../../../shared/Fonts/Fonts';
import { generalStyles } from '../../generalStyles';

export const SearchResult = ({ route }) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();



  //For the button to expand/close all items
  const [expandAll, setExpandedAll] = useState(false);
  const [sqlOffset, setSQLOffset] = useState(null);
  const [page, setPage] = useState(1)
  const { payload, postData } = route.params;
  console.log('------------------------MASTER DATA: ------------------------------------');
  console.log(data)

  if (data) {
    const toFindDuplicates = data => data.filter((item, index) => data.indexOf(item) !== index)
    const duplicateElements = toFindDuplicates(data);
    console.log('duplicates')
    console.log(duplicateElements);
  }

  const hadleShownData = () => {
    console.log('1')
    let sorted = sortArray(payload)
    setSQLOffset(sorted[0].TRDR)
    setData(sorted);
    // console.log('------------------------03 FILTER DATA: ------------------------------------');
    // console.log(data)
  }


  useEffect(() => {
    alert('useEffect')
    hadleShownData();
  }, []);



  const fetchOffset = async () => {

    if (sqlOffset !== null) {
      postData.OFFSET = sqlOffset.toString();
      const res = await fetchData(
        'https://ccmde1.cloudon.gr/softone/searchCustomer.php',
        postData,
      );

      if (res) {
        // console.log('----------New data RESPONSE')
        // console.log(res)


        let sort = sortArray(res)
        alert(sort[0].TRDR)
        console.log(`---------------------------- TRDR ${sort[0].TRDR}`)
        setSQLOffset(sort[0].TRDR)
        setData([...data, ...sort]);

        // console.log('08')
        // console.log(sort[0].TRDR)


      }

    }




  };



  const expandAllItems = () => {
    setExpandedAll(prev => !prev);
  };

  //Flatlist Items:
  //Create the seperator:
  const ItemSeparatorView = () => {
    return (
      <View style={{ width: '100%', margin: 3 }} />
    );
  };
  //Flatlist Item to be rendered:
  const RenderItem = ({ item, index }) => {
    return (
      <ListItem item={item} index={index} expandAll={expandAll} />)
  };


  const keyExtractor = (item, index) => {
    { return index.toString() }
  };

  const handleLoadMore = async () => {
    alert('onEndReach')

    fetchOffset()
    console.log('fetch')
  };



  return (
    <View style={generalStyles.body} >
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
          renderItem={RenderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={12}
        />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '96%',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: COLORS.redPrimary,
    backgroundColor: '#FFFFFF',
  },



  closeTabs: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
